const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const friendShipController = require("../../controllers/friendShip.controller");
const router = express.Router();

router.route("/addFriend").post(verifyToken, friendShipController.addFriend);
router.route("/update/:id").put(verifyToken, friendShipController.update);
router
  .route("/getListFriend/:id")
  .get(verifyToken, friendShipController.getListFriend);
router
  .route("/getListInvite/:id")
  .get(verifyToken, friendShipController.getListInvite);

module.exports = router;
