const postService = require("../services/post.service");
const { HttpStatusCode } = require("../utilities/constants");
const uploadFile = async (req, res) => {
  try {
    const result = await postService.uploadFile(req);
    res.status(HttpStatusCode.OK).json({ data: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  uploadFile,
};
