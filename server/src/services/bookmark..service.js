const bookmarkModel = require("../models/bookmark.model");

const create = async (userId, postId) => {
  try {
    const data = {
      userId: userId,
      postId: postId,
      createdAt: Date.now().toString(),
    };
    const result = await bookmarkModel.create(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBookmark = async (userId, id) => {
  try {
    const result = await bookmarkModel.deleteBookmark(userId, id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAll = async (userId) => {
  try {
    const result = await bookmarkModel.deleteAll(userId);
  } catch (error) {
    throw new Error(error);
  }
};

const getBookmarks = async (userId, paging) => {
  try {
    const result = await bookmarkModel.getBookmarks(userId, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  deleteAll,
  deleteBookmark,
  getBookmarks,
};
