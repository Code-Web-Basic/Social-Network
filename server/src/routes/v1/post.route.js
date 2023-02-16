const postController = require("../../controllers/post.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const videoFileUploader = require("../../middlewares/videocloudinary");
const imageFileUploader = require("../../middlewares/imagecloudinary");
router
  .route("/uploadImage")
  .post(
    verifyToken,
    imageFileUploader.array("files"),
    postController.createPost
  );
router
  .route("/uploadVideo")
  .post(
    verifyToken,
    videoFileUploader.array("files"),
    postController.createPost
  );
router.route("/updatePost/:id").put(verifyToken, postController.updatePost);
router.route("/deletePost/:id").put(verifyToken, postController.deletePost);
router.route("/reaction/:id").post(verifyToken, postController.reaction);
router
  .route("/showReactionOfPost/:id")
  .get(verifyToken, postController.showReactionOfPost);

router.route("/explore").get(verifyToken, postController.explore);
module.exports = router;
