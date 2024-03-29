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
  createdAt: Joi.string().default(""),
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
      console.log(result);
      const notificationData = {
        sourceId: userId,
        targetId: result.ownerId,
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

const explore = async (userId, paging) => {
  try {
    const followOfUser = await getDB()
      .collection("Follows")
      .aggregate([
        { $match: { sourceId: userId } },
        { $group: { _id: "$targetId" } },
      ])
      .toArray();
    const follow = followOfUser.map((data) => {
      return data._id;
    });
    const result = await getDB()
      .collection(postCollectionName)
      .aggregate([
        { $match: { ownerId: { $nin: follow } } },
        { $addFields: { reactionCount: { $size: "$reaction" } } },
        { $addFields: { _ownerId: { $toObjectId: "$ownerId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_ownerId",
            foreignField: "_id",
            as: "User",
          },
        },
        // { $group: { _id: "$_id" } }
      ])
      .sort({ "Post.createdAt": -1 })
      .skip((paging - 1) * 15)
      .limit(15)
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
