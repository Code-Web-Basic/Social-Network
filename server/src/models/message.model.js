const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const messageCollectionName = "message";

const messageCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetType: Joi.string().required(),
  targetId: Joi.string().required(),
  message: Joi.string().required(),
  source: Joi.array().items(
    Joi.object({
      content: Joi.string().default(null),
      type: Joi.string().default(null),
    })
  ),
  isReply: Joi.boolean().default(false),
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
      .collection(userCollectionName)
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
      .insert(validatedValue);
    const getNewMessage = await findOneById(result.insertedId.toString());
    return getNewMessage;
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

const showDirectMessage = async (sourceId, targetId) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .find({ sourceId: sourceId, targetId: targetId })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const findInChat = async (findData, sourceId, targetId, type) => {
  try {
    const dataChat = await show;
  } catch (error) {}
};

const reply = async (id, data, sourceId, targetId) => {
  try {
  } catch (error) {}
};

module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
};
