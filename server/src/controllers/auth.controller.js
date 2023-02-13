const UserService = require("../services/auth.service");
const { HttpStatusCode } = require("../utilities/constants");
const Jwt = require("jsonwebtoken");
const passport = require("passport");
let userInfo = null;
let refreshTokenList = [];

const secret = async (req, res, next) => {
  res.status(HttpStatusCode.OK).json({ User: req.user });
};

const login = async (req, res, next) => {
  try {
    const result = await UserService.login(req.body.email, req.body.password);
    if (result.status === true) {
      const accessToken = UserService.encodedAccessToken(result._id);
      const refreshToken = UserService.encodedRefreshToken(result._id);
      const { password, ...other } = result;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      refreshTokenList.push(refreshToken);
      res.setHeader("token", "Bearer " + accessToken);
      userInfo = other;
      res
        .status(HttpStatusCode.OK)
        .json({ result: other, accessToken: accessToken });
    } else if (result.status === false) {
      res.status(401).json({ result });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const result = await UserService.register(req.body);
    //encoded
    const accessToken = UserService.encodedAccessToken(result._id);
    const refreshToken = UserService.encodedRefreshToken(result._id);
    const { password, ...other } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    refreshTokenList.push(refreshToken);
    res.setHeader("token", "Bearer " + accessToken);
    res
      .status(HttpStatusCode.OK)
      .json({ user: other, accessToken: accessToken });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const signUpFailed = (req, res, next) => {
  res.status(401).json({ error: 404 });
};
const signInSuccess = async (req, res) => {
  if (userInfo !== null) {
    const accessToken = await UserService.encodedAccessToken(userInfo._id);
    const refreshToken = UserService.encodedRefreshToken(userInfo._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    refreshTokenList.push(refreshToken);
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "successfully",
      user: userInfo,
      accessToken: accessToken,
    });
  } else {
    res.status(400).json({ success: false, message: "Error" });
    userInfo = null;
  }
};
const googleCallBack = [
  passport.authenticate("google", {
    failureRedirect: "/signIn/failed",
  }),
  (req, res) => {
    userInfo = req.user;
    res.redirect(
      `http://${process.env.APP_HOST}:${process.env.APP_CLIENT_PORT}`
    );
  },
];
const githubCallBack = [
  passport.authenticate("github", {
    failureRedirect: "/signIn/failed",
  }),
  (req, res) => {
    userInfo = req.user;
    res.redirect(
      `http://${process.env.APP_HOST}:${process.env.APP_CLIENT_PORT}`
    );
  },
];
const logout = (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    userInfo = null;
    refreshTokenList = refreshTokenList.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json({ status: true, msg: "Logged out successfully" });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken from cookie: ", refreshToken);
  console.log(refreshTokenList);
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokenList.includes(refreshToken)) {
    return res.status(403).json("RefreshToken is not valid");
  }
  Jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokenList = refreshTokenList.filter(
      (token) => token !== refreshToken
    );
    const newAccessToken = UserService.encodedAccessToken(user._id);
    const newRefreshToken = UserService.encodedRefreshToken(user._id);
    refreshTokenList.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken: newAccessToken, status: true });
  });
};

module.exports = {
  secret,
  login,
  register,
  signUpFailed,
  signInSuccess,
  logout,
  googleCallBack,
  githubCallBack,
  refresh,
};
