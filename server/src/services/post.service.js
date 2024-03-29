require("dotenv");
const cloudinary = require("cloudinary").v2;
const postModel = require("../models/post.model");

const deletePost = async (id, ownerId) => {
  try {
    const post = await postModel.findOneById(id);
    if (post.ownerId === ownerId) {
      const result = await postModel.deletePost(id);
      if (post.source) {
        post.source.map((item) => {
          console.log(item);
          cloudinary.uploader.destroy(item.filename);
        });
      }
      return result;
    } else {
      return "Bạn không có quyền xóa bài post này";
    }
  } catch (error) {
    throw new Error(error);
  }
};
const createPost = async (data) => {
  try {
    const source = data.files.map((data) => {
      return {
        data: data.path,
        type: data.mimetype,
        filename: data.filename,
      };
    });
    const addData = {
      ...data.body,
      source,
      ownerId: data.user.sub,
      createdAt: Date.now().toString(),
    };
    const result = await postModel.create(addData);
    return result;
  } catch (error) {
    if (data.files) {
      data.files.map((item) => {
        cloudinary.uploader.destroy(item.filename);
      });
    }
    throw new Error(error);
  }
};

const updatePost = async (id, data) => {
  try {
    const result = await postModel.update(id, data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const reaction = async (id, userId) => {
  try {
    const result = await postModel.reaction(id, userId);
    return result;
  } catch (error) {
    throw error;
  }
};

const showReactionOfPost = async (id) => {
  try {
    const result = await postModel.showReactionOfPost(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const explore = async (userId, paging) => {
  try {
    return await postModel.explore(userId, paging);
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    return await postModel.findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createPost,
  deletePost,
  updatePost,
  reaction,
  showReactionOfPost,
  explore,
  getById,
};
