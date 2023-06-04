import { login, pasientesSchema } from "../model/schema";
import main from "./conect";

export const loginDB = ({user, password}:login) => {
    return new Promise( async (resolve,reject)=>{
        try {
            const db = await main();
            const collection = db.model('login', login);
            const data = await collection.findOne({user, password});
            if(data){
                const users = db.model('users', login);
                const user = await users.findOne( {user:data.user}, {"name":1, "user":1, "_id":1} );
                db.disconnect();
                resolve(user);
            }else{
                db.disconnect();
                reject({error:"Invalid user or password"});
            }
        } catch (error) {
            reject("LoginDB query failed");
        }

    });
}