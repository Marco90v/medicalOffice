import { ObjectId } from "mongodb";
import { especialidadesShema, especialistaSchema, login, pasientesSchema, userSchema } from "../model/schema";
import { getConnection } from "./conect";
import mongoose from "mongoose";

export const loginDB = ({user, password}:login) => {
    return new Promise( async (resolve, reject)=>{
        const db = getConnection();
        try {
            const collection = db.model('login', login);
            const data = await collection.findOne({user, password});
            if(data){
                const users = db.model('users', userSchema);
                const user = await users.findOne( {user:data.user}, {"name":1, "user":1, "_id":1} );
                resolve(user);
            }else{
                reject({error:"Incorrect credentials, please verify the data"});
            }
        } catch (error) {
            reject("LoginDB query failed");
        }
    });
}

export const getSpecialtyDB = () => {
    return new Promise( async (resolve, reject) => {
        const db = getConnection();
        try{
            const collection = db.model('especialidades', especialidadesShema);
            const especialidades:specialty[] | undefined = await collection.find({});
            if(especialidades){
                resolve(especialidades);
            }else{
                reject({error:"No specialties were found"});
            }
        }catch(error){
            reject({error:"getSpecialty query failed"});
        }
    });
}

export const setSpecialtyDB = ({name}:setSpecialty) => {
    return new Promise( async (resolve, reject) => {
        const db = getConnection();
        try{
            const collection = db.model('especialidades', especialidadesShema);
            const newData = {
                _id: new ObjectId(),
                name,
            }
            const add = new collection(newData);
            const res = await add.save();
            resolve(res);
        }catch(error){
            reject({error:"setSpecialtyDB query failed"});
        }
    } );
}

export const updateSpecialtyDB = (data:specialty) => {
    return new Promise( async (resolve, reject)=>{
        const { _id, name } = data;
        const db = getConnection();
        try {
            const collection = db.model('especialidades', especialidadesShema);
            const res = await collection.findOneAndUpdate({_id}, {name}, {new: true});
            resolve(res);
        } catch (error) {
            reject({error:"updateSpecialtyDB query failed"});
        }
    });
}

export const deleteSpecialtyDB = (_id:specialtyId) => {
    return new Promise( async (resolve, reject)=>{
        const db = getConnection();
        try {
            const collection = db.model('especialidades', especialidadesShema);
            const res = await collection.findByIdAndDelete(_id);
            resolve(res);
        } catch (error) {
            reject({error:"updateSpecialtyDB query failed"});
        }
    });
}

export const specialistByspecialtyDB = ({idSpecialty}:specialistByspecialty) => {
    return new Promise( async (resolve, reject) => {
        const db = getConnection();
        try{
            const collection = db.model('especialistas', especialistaSchema);
            const especialistas:specialistByspecialty[] | undefined = await collection.find({specialty:idSpecialty}, {_id:1, name:1, lastName:1});
            if(especialistas){
                resolve(especialistas);
            }else{
                reject({error:"No specialists found"});
            }
        }catch(error){
            reject({error:"specialistByspecialtyDB query failed"});
        }
    } );
}

export const specialistDB = () => {
    return new Promise( async (resolve, reject) => {
        const db = getConnection();
        try{
            const collection = db.model('especialistas', especialistaSchema);
            const especialistas:specialist[] | undefined = await collection.aggregate([
                {
                    "$lookup":{
                        from: "especialidades",
                        let: { "searchId": {$toObjectId: "$specialty"} },
                        pipeline:[
                          { $match: { $expr : { $eq: [ '$_id' ,  "$$searchId"] } } },
                          {"$project":{"_id": 0}},
                        ],
                        as: "result",
                    }
                },
                { $unwind: { path: "$result"} },
                { $addFields: {specialtyName: "$result.name"} },
                { $project: { result:0 } }
            ]);
            if(especialistas){
                resolve(especialistas);
            }else{
                reject({error:"No specialists found"});
            }
        }catch(error){
            reject({error:"specialistDB query failed"});
        }
    } );
}

async function getSpecialistByIdDB(collection:any, _id:String){
    try {
        const especialistas:specialist[] = await collection.aggregate([
            { $match:{ _id: new mongoose.Types.ObjectId(_id as string) } },
            {
                $lookup:{
                    from: "especialidades",
                    let: { "searchId": {$toObjectId: "$specialty"} },
                    pipeline:[
                        { $match: { $expr : { $eq: [ '$_id' ,  "$$searchId"] } } },
                        {"$project":{"_id": 0}},
                    ],
                    as: "result",
                }
            },
            { $unwind: { path: "$result"} },
            { $addFields: {specialtyName: "$result.name"} },
            { $project: { result:0 } }
        ]);
        return especialistas[0];
    } catch (error) {
        return {error:"Error updating data"};
    }
}

export const setSpecialistDB = (data:specialist) => {
    return new Promise( async (resolve, reject)=>{
        const db = getConnection();
        try{
            const {_id, ...rest} = data;
            const collection = db.model('especialistas', especialistaSchema);
            const newData = {
                _id: new ObjectId(),
                ...rest,
            }
            const add = new collection(newData);
            const res = await add.save();
            getSpecialistByIdDB(collection, res._id.toString()).then(especialistas=>{
                resolve(especialistas);
            }).catch(()=>{
                reject({error:"No specialists found"});
            });
        }catch(error){
            reject({error:"setSpecialistDB query failed"});
        }

    });
}

export const updateSpecialistDB = (data:specialist) => {
    return new Promise( async (resolve, reject) => {
        const { _id, ...rest } = data;
        const db = getConnection();
        try{
            const collection = db.model('especialistas', especialistaSchema);
            await collection.updateOne({_id}, {...rest}, {new: true});
            getSpecialistByIdDB(collection, _id).then(especialistas=>{
                resolve(especialistas);
            }).catch(()=>{
                reject({error:"No specialists found"});
            });
        }catch(error){
            reject({error:"updateSpecialistDB query failed"});
        }
    });
}

export const removeSpecialistDB = ({_id}:{_id:string}) => {
    return new Promise( async (resolve, reject) => {
        const db = getConnection();
        try{
            const collection = db.model('especialistas', especialistaSchema);
            const especialistas = await collection.findByIdAndDelete(_id);
            resolve(especialistas);
        }catch(error){
            reject({error:"removeSpecialistDB query failed"});
        }
    });
}