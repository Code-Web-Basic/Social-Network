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

const showNotification = async (userId, paging) => {
  try {
    const result = await getDB()
      .collection(notificationCollectionName)
      .aggregate([
        { $match: { targetId: userId } },
        { $addFields: { _sourceId: { $toObjectId: "$sourceId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_sourceId",
            foreignField: "_id",
            as: "User",
          },
        },
      ])
      .limit(15)
      .sort({ createdAt: -1 })
      .skip((paging - 1) * 15)
      .toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  notification: { createNotification, showNotification },
};
