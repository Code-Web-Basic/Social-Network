const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const notificationCollectionName = "Notifications";

const notificationCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  type: Joi.object({
    typeName: Joi.string().default(null),
    id: Joi.string().default(null),
  }).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});
const validateSchema = async (data) => {
  return await notificationCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneByIdNotification = async (id) => {
  try {
    const result = await getDB()
      .collection(notificationCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const createNotification = async (data) => {
  try {
    const validatedValue = await validateSchema(data);

    const result = await getDB()
      .collection(notificationCollectionName)
      .insertOne(validatedValue);
    return await findOneByIdNotification(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};
///////////////////////////////////////////////////////////////////////////////
const searchHistoryCollectionName = "SearchHistory";

const searchHistoryCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  type: Joi.object({
    typeName: Joi.string().default(null),
    id: Joi.string().default(null),
  }),
  createdAt: Joi.date().timestamp().default(Date.now()),
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

const deleteHistory = async (id) => {
  try {
    await getDB()
      .collection(searchHistoryCollectionName)
      .deleteOne({ _id: ObjectId(id) });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  notification: { createNotification },
  searchHistory: { createSearchHistory, deleteHistory },
};
