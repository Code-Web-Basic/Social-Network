const { HttpStatusCode } = require("../utilities/constants");
const commentService = require("../services/commemt.service");

const create = async (req, res) => {
  try {
    const result = await commentService.create(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const update = async (req, res) => {
  try {
    const result = await commentService.update(req.params.id, req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showCommentOfPost = async (req, res) => {
  try {
    const result = await commentService.showCommentOfPost(
      req.params.id,
      req.params.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(req.params.id, req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showCommentReply = async (req, res) => {
  try {
    const result = await commentService.showCommentReply(
      req.params.id,
      req.params.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const reaction = async (req, res) => {
  try {
    const result = await commentService.reaction(req.params.id, req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  create,
  update,
  showCommentOfPost,
  showCommentReply,
  deleteComment,
  reaction,
};
