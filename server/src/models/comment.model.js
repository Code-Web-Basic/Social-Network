const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const commentCollectionName = "Comments";

const commentCollectionSchema = Joi.object({
  senderId: Joi.string().required(),
  content: Joi.string().required(),
  isReply: Joi.boolean().required(),
  replyId: Joi.string().default(null),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});
const validateSchema = async (data) => {
  return await commentCollectionName.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(commentCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
