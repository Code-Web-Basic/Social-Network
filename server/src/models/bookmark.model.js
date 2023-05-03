const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const bookmarkCollectionName = "Bookmarks";

const bookmarkCollectionSchema = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  createdAt: Joi.string().default(""),
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
    const data = await getDB()
      .collection(bookmarkCollectionName)
      .deleteOne({ _id: ObjectId(id), userId: userId });
    if (data.deletedCount > 0) return "deleted successfully";
    else return "not found";
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
  } catch (error) {
    throw new Error(error);
  }
};
const getBookmarks = async (id, paging) => {
  try {
    const result = await getDB()
      .collection("Bookmarks")
      .aggregate([
        { $match: { userId: id } },
        { $addFields: { _postId: { $toObjectId: "$postId" } } },
        {
          $lookup: {
            from: "Posts",
            localField: "_postId",
            foreignField: "_id",
            as: "Post",
          },
        },
      ])
      .limit(15)
      .skip((paging - 1) * 15)
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAlBookmark = async (id) => {
  try {
    const result = await getDB()
      .collection(bookmarkCollectionName)
      .find({ userId: id })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  deleteBookmark,
  deleteAll,
  getBookmarks,
  getAlBookmark,
};
