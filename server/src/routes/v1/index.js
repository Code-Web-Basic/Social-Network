const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth.route");
const friendShipRoutes = require("./friendShip.route");
const messageRoutes = require("./message.route");
router.use("/", AuthRoutes);
router.use("/friend", friendShipRoutes);
router.use("/message", messageRoutes);
module.exports = router;
