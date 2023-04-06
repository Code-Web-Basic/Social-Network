const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const bookmarkCollectionName = "Bookmarks";

const bookmarkCollectionSchema = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});

const validateSchema = async (data) => {
  return await bookmarkCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(bookmarkCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (data) => {
  try {
    const validatedValue = await validateSchema(data);

    const result = await getDB()
      .collection(bookmarkCollectionName)
      .insertOne(validatedValue);
    return await findOneById(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBookmark = async (userId, id) => {
  try {
    await getDB()
      .collection(bookmarkCollectionName)
      .deleteOne({ _id: ObjectId(id), userId: userId });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};
const deleteAll = async (userId) => {
  try {
    await getDB()
      .collection(bookmarkCollectionName)
      .deleteMany({ userId: userId });
    return "deleted successfully";
  } catch (error) {}
};
const getBookmarks = async (id, paging) => {
  try {
    const result = await getDB()
      .collection("Bookmarks")
      .aggregate([
        { $match: { userId: id } },
        { $addFields: { _postId: { $toObjectId: "$postId" } } },
      ])
      .limit(15)
      .skip((paging - 1) * 15)
      .toArray();
    return result;
  } catch (error) {}
};

module.exports = {
  create,
  deleteBookmark,
  deleteAll,
  getBookmarks,
};