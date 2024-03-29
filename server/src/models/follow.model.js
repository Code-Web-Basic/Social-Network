const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const { notification } = require("./other.model");
const followCollectionName = "Follows";

const followCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  createdAt: Joi.string().default(""),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});

const validateSchema = async (data) => {
  return await followCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(followCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const follow = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const notificationData = { ...data, type: { typeName: "follow" } };
    const result = await getDB()
      .collection(followCollectionName)
      .insertOne(validatedValue);

    await notification.createNotification(notificationData);

    return await findOneById(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};

const unFollow = async (data) => {
  try {
    await getDB()
      .collection(followCollectionName)
      .deleteOne({ sourceId: data.sourceId, targetId: data.targetId });
    return "unFollow successfully";
  } catch (error) {
    throw error;
  }
};
const deleteFollower = async (userID, followerId) => {
  try {
    await getDB()
      .collection(followCollectionName)
      .deleteOne({ targetId: userID, sourceId: followerId });
    return "unFollow successfully";
  } catch (error) {
    throw error;
  }
};
const getFollowers = async (userId, paging) => {
  try {
    const result = await getDB()
      .collection(followCollectionName)
      .aggregate([
        { $match: { sourceId: userId } },
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
      .sort({ createdAt: -1 })
      .skip(15 * (paging - 1))
      .limit(15)
      .toArray();
    return result;
  } catch (error) {
    throw error;
  }
};

const getFollowing = async (userId, paging) => {
  try {
    const result = await getDB()
      .collection(followCollectionName)
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
      .sort({ createdAt: -1 })
      .skip(15 * (paging - 1))
      .limit(15)
      .toArray();
    return result;
  } catch (error) {
    throw error;
  }
};
const suggestions = async (userId) => {
  try {
    const followOfUser = await getDB()
      .collection("Follows")
      .aggregate([
        { $match: { sourceId: userId } },
        { $group: { _id: "$targetId" } },
      ])
      .toArray();
    const follow = followOfUser.map((data) => {
      return ObjectId(data._id);
    });
    const result = await getDB()
      .collection("Users")
      .aggregate([
        { $match: { _id: { $nin: follow } } },
        { $sample: { size: 5 } },
      ])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const checkFollow = async (sourceId, targetId) => {
  try {
    console.log(sourceId, targetId);
    const result = await getDB()
      .collection(followCollectionName)
      .findOne({ sourceId: sourceId, targetId: targetId });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
  suggestions,
  deleteFollower,
  checkFollow,
};
