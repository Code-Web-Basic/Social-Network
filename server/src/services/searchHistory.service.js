const searchHistoryModel = require("../models/searchHistory.model");

const createSearchHistory = async (userId, data) => {
  try {
    return await searchHistoryModel.createSearchHistory({
      ...data,
      sourceId: userId,
      createdAt: Date.now().toString(),
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteHistory = async (userId, id) => {
  try {
    return await searchHistoryModel.deleteHistory(userId, id);
  } catch (error) {
    throw new Error(error);
  }
};

const getSearchHistory = async (id) => {
  try {
    return await searchHistoryModel.getSearchHistory(id);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAllHistory = async (userId) => {
  try {
    return await searchHistoryModel.deleteAllHistory(userId);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  deleteHistory,
  createSearchHistory,
  getSearchHistory,
  deleteAllHistory,
};
