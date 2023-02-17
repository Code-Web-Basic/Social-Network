const UserController = require("../../controllers/user.controller");
const searchHistoryController = require("../../controllers/searchHistory.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const imageFileUploader = require("../../middlewares/avatarcloudinary");

router.route("/search").get(verifyToken, UserController.findUser);
router
  .route("/update")
  .put(verifyToken, imageFileUploader.single("file"), UserController.update);
router.route("/newFeed/:paging").get(verifyToken, UserController.newFeed);

module.exports = router;
