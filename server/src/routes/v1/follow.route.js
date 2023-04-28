const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const followController = require("../../controllers/follow.controller");

router
  .route("/unFollow/:targetId")
  .post(verifyToken, followController.unFollow);

router
  .route("/getFollowers/:userId")
  .get(verifyToken, followController.getFollowers);
router
  .route("/getFollowing/:userId")
  .get(verifyToken, followController.getFollowing);
router.route("/suggestions").get(verifyToken, followController.suggestions);
router
  .route("/deleteFollower")
  .post(verifyToken, followController.deleteFollower);
router
  .route("/checkFollow/:targetId")
  .get(verifyToken, followController.checkFollow);
router.route("/:targetId").post(verifyToken, followController.follow);
module.exports = router;
