require("dotenv");
const cloudinary = require("cloudinary").v2;
const postModel = require("../models/post.model");
const uploadFile = async (data) => {
  try {
    const files = data.files.map((data) => {
      return {
        data: data.path,
        type: data.mimetype,
      };
    });
    const addData = { ...data.body, files };
    const result = await postModel.create(addData);
    return result;
  } catch (error) {
    if (data.files) {
      data.files.map((item) => {
        console.log(item);
        cloudinary.uploader.destroy(item.filename);
      });
    }
    throw new Error(error);
  }
};

module.exports = {
  uploadFile,
};
