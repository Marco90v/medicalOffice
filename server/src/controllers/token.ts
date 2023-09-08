import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

// interface error {
//     error:string
// }
// interface dataUser {
//     role: string,
//     specialist: string,
//     specialty: string
// }

const errorAuth:error = { error: "No Authorization" }

dotenv.config();

const SECRET:string = process.env.SECRET || "";

export const getToken = (data:token) => {
    const newData = JSON.parse(JSON.stringify(data));
    const token = jwt.sign(newData,SECRET);
    return token;
}
export const validateToken = (req:Request,res:Response,next:NextFunction) => {
    // try{
    //     const headers = req.headers["authorization"];
    //     if(headers){
    //         const q:string = req.path.slice(1);
    //         const ruta = q.includes("/") ? q.split('/')[0] : q;
    //         const method:string = req.method;
    //         const token = headers.split(' ')[1];
    //         if(!token) return res.status(400).json({ error: "No Authorization" });
    //         // const decrypToken = jwt.verify(token, SECRET);
    //         const dataUser = decryptToken(token);

    //         // console.log(decrypToken);
    //         // const role:any = jwt.verify(token, SECRET,(_,token:token)=>token.role);
    //         // const permision = authorization.find(e=>e.ruta===ruta && e.method===method && e.role.find(y=>y===role));
    //         // if(!permision) return res.status(403).json({ message: "No autorizado" });
    //         if(!dataUser) res.status(403).json({ error: "No Authorization" });
    //         next();
    //     }else{
    //         return res.status(403).json({ error: "No Authorization" });
    //     }
    // }catch(e){
    //     // console.log(e);
    //     return res.status(410).json({ error: "No Authorization" });
    // }
    const dataUser:false | error | string | jwt.JwtPayload = decryptToken(req);
    if( (dataUser as error)?.error || !dataUser ) return res.status(403).json(dataUser);
    next();
}

export const decryptToken = (req:Request):false | error | string | jwt.JwtPayload => {
    try {
        const headers = req.headers["authorization"];
        if(headers){
            const token = headers.split(' ')[1];
            if(!token) return errorAuth;
            const decrypToken = jwt.verify(token, SECRET);
            return decrypToken;
        }else{
            return errorAuth;
        }
    } catch (error) {
        return false;
    }
}