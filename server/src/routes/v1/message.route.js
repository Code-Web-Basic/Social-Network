const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const messageController = require("../../controllers/message.controller");
const messageFileUploader = require("../../middlewares/messagecloudinary");

router
  .route("/sendMessage")
  .post(
    verifyToken,
    messageFileUploader.array("files"),
    messageController.sendMessage
  );

router
  .route("/editMessage/:id")
  .put(verifyToken, messageController.editMessage);

router
  .route("/showMessage/:id")
  .get(verifyToken, messageController.showMessage);

router.route("/showChats").get(verifyToken, messageController.showChats);

module.exports = router;
