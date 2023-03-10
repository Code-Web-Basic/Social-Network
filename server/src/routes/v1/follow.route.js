const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const followController = require("../../controllers/follow.controller");

router.route("/:targetId").post(verifyToken, followController.follow);

router.route("/unFollow").post(verifyToken, followController.unFollow);

router
  .route("/getFollowers/:userId/:paging")
  .get(verifyToken, followController.getFollowers);
router
  .route("/getFollowing/:userId/:paging")
  .get(verifyToken, followController.getFollowing);

module.exports = router;
