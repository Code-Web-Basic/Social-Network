const followModel = require("../models/follow.model");

const follow = async (data) => {
  try {
    const result = await followModel.follow({
      ...data,
      createdAt: Date.now().toString(),
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const unFollow = async (data) => {
  try {
    const result = await followModel.unFollow(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFollowers = async (userId, paging) => {
  try {
    const result = await followModel.getFollowers(userId, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFollowing = async (userId, paging) => {
  try {
    const result = await followModel.getFollowing(userId, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const suggestions = async (userId) => {
  try {
    const result = await followModel.suggestions(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteFollower = async (userId, followerId) => {
  try {
    const result = await followModel.deleteFollower(userId, followerId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const checkFollow = async (sourceId, targetId) => {
  try {
    const result = await followModel.checkFollow(sourceId, targetId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
  suggestions,
  deleteFollower,
  checkFollow,
};
