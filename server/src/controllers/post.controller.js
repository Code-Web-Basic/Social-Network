const postService = require("../services/post.service");
const { HttpStatusCode } = require("../utilities/constants");
const createPost = async (req, res) => {
  try {
    const result = await postService.createPost(req);
    res.status(HttpStatusCode.OK).json({ data: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params, req.user.sub);
    res.status(HttpStatusCode.OK).json({ data: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const result = await postService.updatePost(req.params.id, req.body);
    res.status(HttpStatusCode.OK).json({ data: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const reaction = async (req, res) => {
  try {
    const result = await postService.reaction(req.params.id, req.user.sub);
    res.status(HttpStatusCode.OK).json({ data: result });
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
  reaction,
};
