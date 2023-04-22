const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const encodedAccessToken = (userId) => {
  return JWT.sign(
    {
      iss: "VuThanhSang",
      sub: userId,
      // iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2m",
    }
  );
};

const encodedRefreshToken = (userId) => {
  return JWT.sign(
    {
      iss: "VuThanhSang",
      sub: userId,
      // iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_REFRESH,
    {
      expiresIn: "1w",
    }
  );
};
const register = async (data) => {
  try {
    data.createdAt = Date.now();
    const newUser = await UserModel.signUp({
      ...data,
      createdAt: Date.now().toString(),
    });
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};
const login = async (email, password) => {
  try {
    const result = await UserModel.login(email);
    if (result) {
      const isCorrectPassword = await isValidPassword(
        password,
        result.password
      );
      if (!isCorrectPassword)
        return { status: false, msg: "incorrect password" };
      return { data: result, status: true };
    } else {
      return { status: false, msg: "Email chưa được đăng ký" };
    }
  } catch (error) {
    throw new Error(error);
  }
};
const isValidPassword = async (signInPassword, password) => {
  try {
    return await bcryptjs.compare(signInPassword, password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  register,
  isValidPassword,
  encodedAccessToken,
  login,
  encodedRefreshToken,
};
