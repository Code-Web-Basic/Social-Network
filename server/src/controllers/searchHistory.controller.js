const { HttpStatusCode } = require("../utilities/constants");
const searchHistoryService = require("../services/searchHistory.service");

const createSearchHistory = async (req, res) => {
  try {
    const result = await searchHistoryService.createSearchHistory(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const result = await searchHistoryService.deleteHistory(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    const result = await searchHistoryService.getSearchHistory(req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  deleteHistory,
  createSearchHistory,
  getSearchHistory,
};
