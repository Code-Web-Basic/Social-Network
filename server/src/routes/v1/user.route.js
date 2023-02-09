const UserController = require("../../controllers/user.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.route("/").get(UserController.findUser);

module.exports = router;
