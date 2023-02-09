const postController = require("../../controllers/post.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const videoFileUploader = require("../../middlewares/videocloudinary");
const imageFileUploader = require("../../middlewares/imagecloudinary");
router
  .route("/uploadImage")
  .post(imageFileUploader.array("files"), postController.uploadFile);
router
  .route("/uploadVideo")
  .post(videoFileUploader.array("files"), postController.uploadFile);
module.exports = router;
