const postController = require("../../controllers/post.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router
  .route("/uploadFile")
  .post(upload.array("files"), postController.uploadFile);

module.exports = router;
