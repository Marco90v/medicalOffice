import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main(){
    const connectionString = process.env.DATABASE_URL || "";

    const conn =  await mongoose.connect(connectionString);
    return conn;
}


export default main;