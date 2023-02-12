const { HttpStatusCode } = require("../utilities/constants");
const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessage(req.body);
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

const showDirectMessage = async (req, res) => {
  try {
    const result = await messageService.showDirectMessage(req.body);
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
  showDirectMessage,
};
