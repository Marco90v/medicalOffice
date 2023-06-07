import { ObjectId } from "mongodb";
import { especialidadesShema, especialistaSchema, login, pasientesSchema, userSchema } from "../model/schema";
import main from "./conect";

export const loginDB = ({user, password}:login) => {
    return new Promise( async (resolve, reject)=>{
        const db = await main();
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
        db.disconnect();
    });
}

export const getSpecialtyDB = () => {
    return new Promise( async (resolve, reject) => {
        const db = await main();
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
        db.disconnect();
    });
}

export const setSpecialtyDB = (data:setSpecialty) => {
    return new Promise( async (resolve, reject) => {
        const db = await main();
        try{
            const collection = db.model('especialidades', especialidadesShema);
            const newData = {
                _id: new ObjectId(),
                name: data.specialty
            }
            const add = new collection(newData);
            const res = await add.save();
            resolve(res);
        }catch(error){
            reject({error:"setSpecialtyDB query failed"});
        }
        db.disconnect();
    } );
}

export const updateSpecialtyDB = (data:specialty) => {
    return new Promise( async (resolve, reject)=>{
        const { _id, name } = data;
        const db = await main();
        try {
            const collection = db.model('especialidades', especialidadesShema);
            const res = await collection.findOneAndUpdate({_id}, {name}, {new: true});
            resolve(res);
        } catch (error) {
            reject({error:"updateSpecialtyDB query failed"});
        }
        db.disconnect();
    });
}

export const deleteSpecialtyDB = (_id:specialtyId) => {
    return new Promise( async (resolve, reject)=>{
        const db = await main();
        try {
            const collection = db.model('especialidades', especialidadesShema);
            const res = await collection.findByIdAndDelete(_id);
            resolve(res);
        } catch (error) {
            reject({error:"updateSpecialtyDB query failed"});
        }
        db.disconnect();
    });
}

export const specialistByspecialtyDB = ({idSpecialty}:specialistByspecialty) => {
    return new Promise( async (resolve, reject) => {
        const db = await main();
        try{
            const collection = db.model('especialistas', especialistaSchema);
            const especialistas:specialistByspecialty[] | undefined = await collection.find({specialty:idSpecialty});
            if(especialistas){
                resolve(especialistas);
            }else{
                reject({error:"No specialists found"});
            }
        }catch(error){
            reject({error:"specialistByspecialtyDB query failed"});
        }
        db.disconnect();
    } );
}