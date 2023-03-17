const { HttpStatusCode } = require("../utilities/constants");
const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessage(req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const editMessage = async (req, res) => {
  try {
    const result = await messageService.editMessage(req.params.id, req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showMessage = async (req, res) => {
  try {
    const result = await messageService.showDirectMessage(
      req.user.sub,
      req.params.id
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const showChats = async (req, res) => {
  try {
    const result = await messageService.showChats(req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  sendMessage,
  editMessage,
  showMessage,
  showChats,
};
