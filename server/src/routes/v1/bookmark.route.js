const bookmarkController = require("../../controllers/bookmark.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.route("/create").post(verifyToken, bookmarkController.create);

router
  .route("/delete/:id")
  .post(verifyToken, bookmarkController.deleteBookmark);
router.route("/deleteAll").post(verifyToken, bookmarkController.deleteAll);
router.route("/getBookmarks").get(verifyToken, bookmarkController.getBookmarks);

module.exports = router;
