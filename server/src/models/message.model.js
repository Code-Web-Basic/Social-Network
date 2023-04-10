const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const messageCollectionName = "message";

const messageCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  message: Joi.string().required(),
  source: Joi.array()
    .items({ type: Joi.string(), data: Joi.string(), filename: Joi.string() })
    .default([]),
  isReply: Joi.boolean().required(),
  replyId: Joi.string().default(null),
  isDestroy: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
});

const validateSchema = async (data) => {
  return await messageCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//sourceId, targetId, message , targetType
const sendMessage = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const result = await getDB()
      .collection(messageCollectionName)
      .insertOne(validatedValue);
    const getNewMessage = await findOneById(result.insertedId.toString());
    return getNewMessage;
  } catch (error) {
    throw new Error(error);
  }
};

const showChats = async (userId) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .aggregate([
        { $match: { $or: [{ sourceId: userId }, { targetId: userId }] } },
        {
          $group: {
            _id: "$_id",
            targetId: { $first: "$targetId" },
            sourceId: { $first: "$sourceId" },
            createdAt: { $first: "$createdAt" },
          },
        },
        {
          $addFields: {
            _targetId: {
              $switch: {
                branches: [
                  {
                    case: { $ne: [userId, "$targetId"] },
                    then: { $toObjectId: "$targetId" },
                  },
                ],
                default: { $toObjectId: "$sourceId" },
              },
            },
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "_targetId",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $group: {
            _id: "$User._id",
            // _id: "$_id",
            User: { $first: "$User" },
            createdAt: { $max: "$createdAt" },
          },
        },
      ])
      .sort({ createdAt: 1 })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const editMessage = async (updateData, id) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const showDirectMessage = async (sourceId, targetId, paging) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .aggregate([
        {
          $match: {
            $or: [
              { sourceId: sourceId, targetId: targetId },
              { sourceId: targetId, targetId: sourceId },
            ],
          },
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//??
const findInChat = async (findData, sourceId, targetId) => {
  try {
    const dataChat = await getDB()
      .collection(messageCollectionName)
      .aggregate([{ $match: { sourceId: sourceId, targetId: targetId } }]);
  } catch (error) {}
};

module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
  showChats,
};
