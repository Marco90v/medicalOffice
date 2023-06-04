import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET:string = process.env.SECRET || "";

export const getToken = (data:token) => {
    const newData = JSON.parse(JSON.stringify(data));
    const token = jwt.sign(newData,SECRET);
    return token;
}