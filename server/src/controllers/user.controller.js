const UserService = require("../services/user.service");
const { HttpStatusCode } = require("../utilities/constants");

const findUser = async (req, res) => {
  try {
    const result = await UserService.findUser(req.params.userName);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  findUser,
};
