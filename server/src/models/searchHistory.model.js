const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const searchHistoryCollectionName = "SearchHistory";

const searchHistoryCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  createdAt: Joi.string().default(""),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});
const validateSchemaSearchHistory = async (data) => {
  return await searchHistoryCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneByIdSearchHistory = async (id) => {
  try {
    const result = await getDB()
      .collection(searchHistoryCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const createSearchHistory = async (data) => {
  try {
    const validatedValue = await validateSchemaSearchHistory(data);

    const result = await getDB()
      .collection(searchHistoryCollectionName)
      .insertOne(validatedValue);
    return await findOneByIdSearchHistory(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};

const getSearchHistory = async (id) => {
  try {
    const result = await getDB()
      .collection(searchHistoryCollectionName)
      .aggregate([
        { $match: { sourceId: id } },
        { $addFields: { _targetId: { $toObjectId: "$targetId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_targetId",
            foreignField: "_id",
            as: "User",
          },
        },
      ])
      .limit(10)
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteHistory = async (userId, id) => {
  try {
    await getDB()
      .collection(searchHistoryCollectionName)
      .deleteOne({ _id: ObjectId(id), sourceId: userId });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};
const deleteAllHistory = async (userId) => {
  try {
    await getDB()
      .collection(searchHistoryCollectionName)
      .deleteMany({ sourceId: userId });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  deleteHistory,
  createSearchHistory,
  getSearchHistory,
  deleteAllHistory,
};
