import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const pasientesSchema = new Schema({
    _id: ObjectId,
    name: String,
    lastName: String,
});