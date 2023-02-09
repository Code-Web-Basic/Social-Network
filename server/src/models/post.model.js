const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const postCollectionName = "Posts";

const postCollectionSchema = Joi.object({
  caption: Joi.string().required(),
  ownerId: Joi.string().required(),
  source: Joi.array()
    .items({ type: Joi.string(), data: Joi.string() })
    .default([]),
  isVideo: Joi.boolean().required(),
  reaction: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});
const validateSchema = async (data) => {
  return await postCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(postCollectionName)
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
      .collection(postCollectionName)
      .insertOne(validatedValue);
    return await findOneById(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    data.updatedAt = Date.now();
    await getDB()
      .collection(postCollectionName)
      .findOneAndUpdate({ _id: id }, { $set: data });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const reaction = async (id, userId) => {
  try {
    await getDB()
      .collection(postCollectionName)
      .findOneAndUpdate({ _id: id }, { $push: { reaction: userId } });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  update,
  reaction,
};
