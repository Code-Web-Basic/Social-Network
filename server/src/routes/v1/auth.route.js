const express = require("express");
const passport = require("passport");
const AuthController = require("../../controllers/auth.controller");
const verifyToken = require("../../middlewares/verifyToken");
const passportConfig = require("../../middlewares/passport");
const router = express.Router();

router
  .route("/secret")
  .get(passport.authenticate("jwt", { section: false }), AuthController.secret);
router.route("/register").post(AuthController.register);

router.route("/login").post(AuthController.login);
router.route("/signIn/failed").get(AuthController.signUpFailed);
router.route("/signIn/success").get(AuthController.signInSuccess);
router.route("/logout").post(verifyToken, AuthController.logout);
router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

router.route("/auth/google/callback").get(AuthController.googleCallBack);

router
  .route("/auth/github")
  .get(passport.authenticate("github", { scope: ["user:email", "profile"] }));

router.route("/auth/github/callback").get(AuthController.githubCallBack);

router.route("/refresh").post(AuthController.refresh);
module.exports = router;
