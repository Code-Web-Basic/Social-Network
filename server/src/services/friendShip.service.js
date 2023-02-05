const friendShipModel = require("../models/friendShip.model");

const addFriend = async (data) => {
  try {
    const result = await friendShipModel.addFriend(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const result = await friendShipModel.update(id, data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getListFriend = async (id) => {
  try {
    const result = await friendShipModel.getListFriend(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getListInvite = async (id) => {
  try {
    const result = await friendShipModel.getListInvite(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  update,
  getListFriend,
  addFriend,
  getListInvite,
};
