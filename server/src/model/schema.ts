import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const login = new Schema({
    _id: ObjectId,
    user: String,
    password: String,
    _idUser: String
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
    specialtyName: String,
    phone: String,
    email: String,
    sex: String,
    dateOfBirth: String,
    dni: String
});

const background = new Schema({
    relationship: String,
    details: String
});

const attention = new Schema({
    date: String,
    reason:String,
    result:String
});

export const pacientesSchema = new Schema({
    _id: ObjectId,
    dni: String,
    fullName: String,
    fullSurname: String,
    gender: String,
    email: String,
    phone: String,
    dateOfBirth: String,
    smoke: String,
    alcohol: String,
    canavis: String,
    cocaine: String,
    background:[background],
    attention: [attention]
});

export const queueSchema = new Schema({
    _id : ObjectId,
    dni: String,
    specialist: String,
    specialty: String,
});