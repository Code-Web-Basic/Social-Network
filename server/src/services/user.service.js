const UserModel = require("../models/user.model");

const findUser = async (data) => {
  try {
    const result = await UserModel.findUser(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  findUser,
};
