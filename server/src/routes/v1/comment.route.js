const commentController = require("../../controllers/comment.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.route("/create").post(verifyToken, commentController.create);

router.route("/update/:id").put(verifyToken, commentController.update);

router.route("/delete/:id").put(verifyToken, commentController.deleteComment);

router
  .route("/showCommentOfPost/:id/:paging")
  .get(commentController.showCommentOfPost);
router
  .route("/showCommentReply/:id/:paging")
  .get(commentController.showCommentReply);
router.route("/reaction/:id").put(verifyToken, commentController.reaction);
module.exports = router;
