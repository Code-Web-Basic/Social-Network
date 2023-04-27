const commentController = require("../../controllers/comment.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.route("/create").post(verifyToken, commentController.create);

router.route("/update/:id").put(verifyToken, commentController.update);

router.route("/delete/:id").put(verifyToken, commentController.deleteComment);

router
  .route("/showCommentOfPost/:id")
  .get(verifyToken, commentController.showCommentOfPost);
router
  .route("/showCommentReply/:id")
  .get(verifyToken, commentController.showCommentReply);
router.route("/reaction/:id").put(verifyToken, commentController.reaction);
router
  .route("/showReaction/:id")
  .get(verifyToken, commentController.showReaction);
module.exports = router;
