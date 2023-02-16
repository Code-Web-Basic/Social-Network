const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const { notification } = require("./other.model");

const postCollectionName = "Posts";

const postCollectionSchema = Joi.object({
  caption: Joi.string().required(),
  ownerId: Joi.string().required(),
  source: Joi.array()
    .items({ type: Joi.string(), data: Joi.string(), filename: Joi.string() })
    .default([]),
  isVideo: Joi.boolean().required(),
  reaction: Joi.array().items(Joi.string()).default([]),
  commentCount: Joi.number().default(0),
  createdAt: Joi.date().timestamp().default(Date.now()),
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

const deletePost = async (id) => {
  try {
    await getDB()
      .collection(postCollectionName)
      .deleteOne({ _id: ObjectId(id) });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    await getDB()
      .collection(postCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const reaction = async (id, userId) => {
  try {
    const checkExists = await getDB()
      .collection(postCollectionName)
      .find({ _id: ObjectId(id), reaction: { $in: [userId] } })
      .toArray();
    if (checkExists.length === 0) {
      await getDB()
        .collection(postCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $push: { reaction: userId } }
        );
      const result = await findOneById(id);
      const notificationData = {
        sourceId: userId,
        targetId: result.targetId,
        type: { typeName: "post", id: id },
      };
      await notification.createNotification(notificationData);
      return result;
    } else {
      await getDB()
        .collection(postCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $pull: { reaction: userId } }
        );
      return await findOneById(id);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const showReactionOfPost = async (id) => {
  try {
    const result = await getDB()
      .collection(postCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(id) } },
        { $unwind: "$reaction" },
        { $addFields: { _reaction: { $toObjectId: "$reaction" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_reaction",
            foreignField: "_id",
            as: "User",
          },
        },
        { $group: { _id: "$_id", User: { $push: "$User" } } },
      ])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const explore = async () => {
  try {
    const result = await getDB()
      .collection(postCollectionName)
      .aggregate([
        { $sample: { size: 5 } },
        { $addFields: { reactionCount: { $size: "$reaction" } } },
        // { $group: { _id: "$_id" } }
      ])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  update,
  reaction,
  deletePost,
  findOneById,
  showReactionOfPost,
  explore,
};
