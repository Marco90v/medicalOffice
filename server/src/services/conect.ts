import mongoose from 'mongoose';
import dotenv from 'dotenv';

type callback = ()=>void;

dotenv.config();

let conn:typeof mongoose;

async function startConnection(callback:callback){
    const connectionString = process.env.DATABASE_URL || "";

    mongoose.connect(connectionString)
    .then((result)=>{
        conn = result;
        callback();
    })
    .catch(error=>{
        console.log(error);
    });
}

function getConnection(){
    return conn;
}


export { startConnection, getConnection };