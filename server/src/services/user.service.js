const UserModel = require("../models/user.model");
const findUser = async (data) => {
  try {
    const result = await UserModel.findUser(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const avatar = {
      data: data.file.path,
      type: data.file.mimetype,
      filename: data.file.filename,
    };
    const updateData = { ...data.body, avatar };
    const result = await UserModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const newFeed = async (id, paging) => {
  try {
    const result = await UserModel.newFeed(id, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  findUser,
  update,
  newFeed,
};
