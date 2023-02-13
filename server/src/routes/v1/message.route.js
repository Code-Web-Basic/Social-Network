const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const messageController = require("../../controllers/message.controller");

router.route("/sendMessage").post(verifyToken, messageController.sendMessage);

router
  .route("/editMessage/:id")
  .put(verifyToken, messageController.editMessage);

router
  .route("/showMessage/:id")
  .get(verifyToken, messageController.showMessage);

module.exports = router;
