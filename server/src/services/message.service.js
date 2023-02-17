const messageModel = require("../models/message.model");

const sendMessage = async (data) => {
  try {
    const result = await messageModel.sendMessage(data);
    return result;
  } catch (error) {
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

const showDirectMessage = async (data) => {
  try {
    const result = await messageModel.showDirectMessage(
      data.sourceId,
      data.targetId
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
};
