const messageModel = require("../models/message.model");
const cloudinary = require("cloudinary").v2;

const sendMessage = async (req) => {
  try {
    const source = req.files?.map((data) => {
      return {
        data: data.path,
        type: data.mimetype,
        filename: data.filename,
      };
    });
    const addData = { ...req.body, source, sourceId: req.user.sub };
    const result = await messageModel.sendMessage(addData);
    return result;
  } catch (error) {
    if (req.files) {
      req.files.map((item) => {
        cloudinary.uploader.destroy(item.filename);
      });
    }
    throw new Error(error);
  }
};
const editMessage = async (id, data) => {
  try {
    const result = await messageModel.editMessage(data, id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const showDirectMessage = async (userId, data, paging) => {
  try {
    const result = await messageModel.showDirectMessage(userId, data, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const showChats = async (userId) => {
  try {
    const result = await messageModel.showChats(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
  showChats,
};
