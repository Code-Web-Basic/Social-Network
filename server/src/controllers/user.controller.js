const UserService = require("../services/user.service");
const { HttpStatusCode } = require("../utilities/constants");

const findUser = async (req, res) => {
  try {
    const result = await UserService.findUser(req.query.query);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const newFeed = async (req, res) => {
  try {
    const result = await UserService.newFeed(req.user.sub, req.query.paging);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const update = async (req, res) => {
  try {
    const result = await UserService.update(req.user.sub, req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const postOfUser = async (req, res) => {
  try {
    const result = await UserService.postOfUser(
      req.params.id,
      req.query.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showNotification = async (req, res) => {
  try {
    const result = await UserService.showNotification(
      req.user.sub,
      req.query.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const findById = async (req, res) => {
  try {
    const result = await UserService.findById(req.params.id);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  findUser,
  update,
  newFeed,
  postOfUser,
  showNotification,
  findById,
};
