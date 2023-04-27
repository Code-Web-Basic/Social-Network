const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");
const { cloneDeep } = require("lodash");
const follow = require("./follow.model");

const userCollectionName = "Users";

const userCollectionSchema = Joi.object({
  Name: Joi.string().max(50).default(null),
  userName: Joi.string().default(null),
  password: Joi.string().min(5).max(30).trim().default(null),
  createdAt: Joi.string().default(""),
  updatedAt: Joi.date().default(null),
  email: Joi.string().required().email(),
  mobile: Joi.string().default(null),
  lastLogin: Joi.date().default(null),
  intro: Joi.string().default(null),
  profile: Joi.string().default(null),
  avatar: Joi.string().default(null),
  authGoogleId: Joi.string().default(null),
  authGithubId: Joi.string().default(null),
  authType: Joi.string().valid("local", "google", "github").default("local"),
});

const encodePassword = async (data) => {
  try {
    //generate a salt
    const tempData = cloneDeep(data);
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(tempData.password, salt);
    tempData.password = passwordHashed;
    return tempData;
  } catch (error) {
    throw new Error(error);
  }
};
const validateSchema = async (data) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false });
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
const lookupEmail = async (email) => {
  const valid = await getDB()
    .collection(userCollectionName)
    .findOne({ email: email });
  if (valid) {
    throw new Error("email is already exist");
  }
};
const login = async (email) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .findOne({ email: email, authType: "local" });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const signUp = async (data) => {
  try {
    // validate data
    //check email exist
    const validatedValue = await validateSchema(data);
    let insertValue = cloneDeep(validatedValue);
    if (validatedValue.authType === "local") {
      const schema = Joi.string().external(lookupEmail);
      await schema.validateAsync(data.email);
      //encode password
      insertValue = await encodePassword(validatedValue);
    }

    //add data to database
    const result = await getDB()
      .collection(userCollectionName)
      .insertOne(insertValue);
    await follow.follow({
      targetId: result.insertedId.toString(),
      sourceId: result.insertedId.toString(),
      createdAt: Date.now().toString(),
    });
    //find and return added data
    const GetNewUser = await findOneById(result.insertedId.toString());
    return GetNewUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUser = async () => {
  const result = await getDB()
    .collection(userCollectionName)
    .find({})
    .toArray();
  return result;
};

const findUser = async (data) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .find({
        $or: [
          {
            Name: { $regex: data },
          },
          {
            userName: { $regex: data },
          },
        ],
      })
      .limit(20)
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    await getDB()
      .collection(userCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const newFeed = async (id, paging) => {
  try {
    const result = await getDB()
      .collection("Follows")
      .aggregate([
        { $match: { sourceId: id } },
        { $addFields: { _targetId: { $toObjectId: "$targetId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_targetId",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $lookup: {
            from: "Posts",
            localField: "targetId",
            foreignField: "ownerId",
            as: "Post",
          },
        },
        { $unwind: "$Post" },
        { $unwind: "$User" },
        { $addFields: { reactionCount: { $size: "$Post.reaction" } } },
        {
          $addFields: {
            commentPaging: {
              $ceil: {
                $divide: [
                  {
                    $cond: {
                      if: { $eq: ["$Post.commentCount", 0] },
                      then: 1,
                      else: "$Post.commentCount",
                    },
                  },
                  15,
                ],
              },
            },
          },
        },
        { $project: { User: 1, Post: 1, reactionCount: 1, commentPaging: 1 } },
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

const postOfUser = async (id, paging) => {
  try {
    const result = await getDB()
      .collection("Posts")
      .find({ ownerId: id })
      .sort({ createdAt: -1 })
      .skip((paging - 1) * 15)
      .limit(15)
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signUp,
  findOneById,
  validateSchema,
  login,
  getAllUser,
  findUser,
  update,
  newFeed,
  postOfUser,
};
