const friendShipService = require("../services/friendShip.service");
const { HttpStatusCode } = require("../utilities/constants");

const update = async (req, res) => {
  try {
    const result = await friendShipService.update(req.params.id, req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const addFriend = async (req, res) => {
  try {
    const result = await friendShipService.addFriend(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getListFriend = async (req, res) => {
  try {
    const result = await friendShipService.getListFriend(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getListInvite = async (req, res) => {
  try {
    const result = await friendShipService.getListInvite(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  update,
  getListFriend,
  addFriend,
  getListInvite,
};
