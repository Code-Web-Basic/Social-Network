const followModel = require("../models/follow.model");

const follow = async (data) => {
  try {
    const result = await followModel.follow(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const unFollow = async (data) => {
  try {
    const result = await followModel.follow(data);
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

module.exports = {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
};
