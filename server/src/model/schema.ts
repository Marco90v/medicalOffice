import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const login = new Schema({
    _id: ObjectId,
    user: String,
    password: String
});

export const userSchema = new Schema({
    _id: ObjectId,
    user:String,
    name:String,
    lastName:String,
    email:String,
    phone:String,
    role:String,
});

export const pasientesSchema = new Schema({
    _id: ObjectId,
    name: String,
    lastName: String,
});

export const especialidadesShema = new Schema({
    _id: ObjectId,
    name: String,
});

export const especialistaSchema = new Schema({
    _id: ObjectId,
    name: String,
    lastName: String,
    specialty: String,
});