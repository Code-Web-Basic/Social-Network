const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const commentCollectionName = "Comments";

const commentCollectionSchema = Joi.object({
  postId: Joi.string().required(),
  senderId: Joi.string().required(),
  content: Joi.string().required(),
  isReply: Joi.boolean().required(),
  replyId: Joi.string().default(null),
  reaction: Joi.array().items(Joi.string()).default([]),
  replyCount: Joi.number().default(0),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});
const validateSchema = async (data) => {
  return await commentCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
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

const create = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    if (data.isReply === true) {
      await getDB()
        .collection(commentCollectionName)
        .findOneAndUpdate({ _id: data.replyId }, { $inc: { replyCount: 1 } });
    } else {
      await getDB()
        .collection("Posts")
        .findOneAndUpdate({ _id: data.postId }, { $inc: { commentCount: 1 } });
    }
    const result = await getDB()
      .collection(commentCollectionName)
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
      .collection(commentCollectionName)
      .findOneAndUpdate({ _id: id }, { $set: data });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const showCommentOfPost = async (postId, paging) => {
  try {
    const result = await getDB()
      .collection(commentCollectionName)
      .aggregate([
        { $match: { postId: postId } },
        { $addFields: { _senderId: { $toObjectId: "$senderId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_senderId",
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
    throw new Error(error);
  }
};
const showCommentReply = async (replyId, paging) => {
  try {
    const result = await getDB()
      .collection(commentCollectionName)
      .aggregate([
        { $match: { replyId: replyId } },
        { $addFields: { _senderId: { $toObjectId: "$senderId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_senderId",
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
    throw new Error(error);
  }
};
const deleteComment = async (id) => {
  try {
    await getDB()
      .collection(commentCollectionName)
      .deleteOne({ _id: ObjectId(id) });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};

const reaction = async (id, userId) => {
  try {
    await getDB()
      .collection(commentCollectionName)
      .findOneAndUpdate({ _id: id }, { $push: { reaction: userId } });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  create,
  update,
  showCommentOfPost,
  findOneById,
  showCommentReply,
  deleteComment,
  reaction,
};
