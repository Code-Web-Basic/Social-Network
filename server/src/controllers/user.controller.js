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
    const result = await UserService.newFeed(req.user.sub, req.params.paging);
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
module.exports = {
  findUser,
  update,
  newFeed,
};
