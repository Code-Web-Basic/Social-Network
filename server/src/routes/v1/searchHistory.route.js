const searchHistoryController = require("../../controllers/searchHistory.controller");
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router
  .route("/create")
  .post(verifyToken, searchHistoryController.createSearchHistory);
router
  .route("/delete/:id")
  .post(verifyToken, searchHistoryController.deleteHistory);
router.route("/").get(verifyToken, searchHistoryController.getSearchHistory);
module.exports = router;
