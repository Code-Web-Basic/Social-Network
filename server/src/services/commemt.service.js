const commentModel = require("../models/comment.model");

const create = async (userId, data) => {
  try {
    const result = await commentModel.create({ ...data, senderId: userId });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, req) => {
  try {
    const comment = await commentModel.findOneById(id);
    if (comment.senderId === req.user.sub) {
      const result = await commentModel.update(id, req.body);
      return result;
    } else {
      return "Bạn không có quyền chỉnh sửa comment này";
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteComment = async (id, req) => {
  try {
    const comment = await commentModel.findOneById(id);
    if (comment.senderId === req.user.sub) {
      const result = await commentModel.deleteComment(id, req.body);
      return result;
    } else {
      return "Bạn không có quyền xóa comment này";
    }
  } catch (error) {
    throw new Error(error);
  }
};

const showCommentOfPost = async (id, paging) => {
  try {
    const result = await commentModel.showCommentOfPost(id, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const showCommentReply = async (id, paging) => {
  try {
    const result = await commentModel.showCommentReply(id, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const reaction = async (id, req) => {
  try {
    const userId = req.user.sub;
    const result = await commentModel.reaction(id, userId);
    return result;
  } catch (error) {
    throw new Error(error);
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
