const { HttpStatusCode } = require("../utilities/constants");
const bookmarkService = require("../services/bookmark..service");

const create = async (req, res) => {
  try {
    const result = await bookmarkService.create(req.user.sub, req.body.postId);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const result = await bookmarkService.deleteBookmark(
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

const deleteAll = async (req, res) => {
  try {
    const result = await bookmarkService.deleteAll(req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const result = await bookmarkService.getBookmarks(
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

module.exports = {
  create,
  deleteAll,
  deleteBookmark,
  getBookmarks,
};
