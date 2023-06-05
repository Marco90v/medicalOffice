import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const SECRET:string = process.env.SECRET || "";

export const getToken = (data:token) => {
    const newData = JSON.parse(JSON.stringify(data));
    const token = jwt.sign(newData,SECRET);
    return token;
}
export const validateToken = (req:Request,res:Response,next:NextFunction) => {
    try{
        const headers = req.headers["authorization"];
        if(headers){
            const q:string = req.path.slice(1);
            const ruta = q.includes("/") ? q.split('/')[0] : q;
            const method:string = req.method;
            const token = headers.split(' ')[1];
            if(!token) return res.status(400).json({ error: "No autorizado" });
            const decrypToken = jwt.verify(token, SECRET);
            // console.log(decrypToken);
            // const role:any = jwt.verify(token, SECRET,(_,token:token)=>token.role);
            // const permision = authorization.find(e=>e.ruta===ruta && e.method===method && e.role.find(y=>y===role));
            // if(!permision) return res.status(403).json({ message: "No autorizado" });
            if(!decrypToken) res.status(403).json({ error: "No autorizado" });
            next();
        }else{
            return res.status(403).json({ message: "No autorizado" })
        }
    }catch(e){
        console.log(e);
        return res.status(410).json({ message: "No autorizado" });
    }
}