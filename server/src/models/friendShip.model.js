const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const friendShipCollectionName = "friendShip";

const friendShipCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.boolean().required(),
  notes: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
});
const validateSchema = async (data) => {
  return await friendShipCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(friendShipCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const addFriend = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const result = await getDB()
      .collection(friendShipCollectionName)
      .insertOne(validatedValue);
    return await findOneById(result.insertedId.toString());
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    await getDB()
      .collection(friendShipCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: data });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const getListFriend = async (id) => {
  try {
    const result = await getDB()
      .collection(friendShipCollectionName)
      .find({
        $or: [{ sourceId: ObjectId(id) }, { targetId: ObjectId(id) }],
        status: true,
      })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getListInvite = async (id) => {
  try {
    const result = await getDB()
      .collection(friendShipCollectionName)
      .find({ targetId: id, status: false })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  findOneById,
  update,
  getListFriend,
  addFriend,
  getListInvite,
};
