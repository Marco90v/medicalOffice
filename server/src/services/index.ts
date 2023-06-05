import { especialidadesShema, login, pasientesSchema, userSchema } from "../model/schema";
import main from "./conect";

export const loginDB = ({user, password}:login) => {
    return new Promise( async (resolve, reject)=>{
        try {
            const db = await main();
            const collection = db.model('login', login);
            const data = await collection.findOne({user, password});
            if(data){
                const users = db.model('users', userSchema);
                const user = await users.findOne( {user:data.user}, {"name":1, "user":1, "_id":1} );
                // const user = await users.findOne( {user:data.user} );
                // console.log(user);
                db.disconnect();
                resolve(user);
            }else{
                db.disconnect();
                reject({error:"Incorrect credentials, please verify the data"});
            }
        } catch (error) {
            reject("LoginDB query failed");
        }

    });
}

export const getSpecialtyDB = () => {
    return new Promise( async (resolve, reject) => {
        try{
            const db = await main();
            const collection = db.model('especialidades', especialidadesShema);
            const especialidades:specialty[] | undefined = await collection.find({});
            if(especialidades){
                db.disconnect();
                resolve(especialidades);
            }else{
                db.disconnect();
                reject({error:"No specialties were found"});
            }
        }catch(error){
            reject({error:"getSpecialty query failed"});
        }
    });
}