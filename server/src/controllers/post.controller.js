const postService = require("../services/post.service");
const { HttpStatusCode } = require("../utilities/constants");
const createPost = async (req, res) => {
  try {
    const result = await postService.createPost(req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params, req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const result = await postService.updatePost(req.params.id, req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const reaction = async (req, res) => {
  try {
    const result = await postService.reaction(req.params.id, req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showReactionOfPost = async (req, res) => {
  try {
    const result = await postService.showReactionOfPost(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const explore = async (req, res) => {
  try {
    const result = await postService.explore();
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const result = await postService.getById(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  createPost,
  deletePost,
  updatePost,
  showReactionOfPost,
  reaction,
  explore,
  getById,
};
