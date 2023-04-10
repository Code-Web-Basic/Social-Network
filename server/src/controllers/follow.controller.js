const { HttpStatusCode } = require("../utilities/constants");
const followService = require("../services/follow.service");

const follow = async (req, res) => {
  try {
    const result = await followService.follow({
      targetId: req.params.targetId,
      sourceId: req.user.sub,
    });
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const unFollow = async (req, res) => {
  try {
    const result = await followService.unFollow({
      targetId: req.params.targetId,
      sourceId: req.user.sub,
    });
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const result = await followService.getFollowers(
      req.params.userId,
      req.query.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const result = await followService.getFollowing(
      req.params.userId,
      req.query.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const suggestions = async (req, res) => {
  try {
    const result = await followService.suggestions(req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const deleteFollower = async (req, res) => {
  try {
    const result = await followService.deleteFollower(
      req.user.sub,
      req.body.followerId
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
  suggestions,
  deleteFollower,
};
