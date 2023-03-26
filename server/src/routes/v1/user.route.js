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
router.route("/newFeed").get(verifyToken, UserController.newFeed);
router.route("/postOfUser/:id").get(verifyToken, UserController.postOfUser);
router
  .route("/showNotification")
  .get(verifyToken, UserController.showNotification);
router.route("/findById/:id").get(verifyToken, UserController.findOneById);
module.exports = router;
