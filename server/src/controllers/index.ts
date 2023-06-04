import { Request, Response } from "express";
import { loginReqValidator } from "./validator";
import * as services from "../services";
import { getToken } from "./token";

export const login = (req:Request,res:Response):void => {
    const data = loginReqValidator(req.body);
    if(data){
        services.loginDB(data).then((resolve:any)=>{
            const token = getToken(resolve);
            res.status(200).send(token);
        }).catch(reject=>res.status(400).json(reject));
    }else{
        res.status(400).json({error:"Error en la estructura de datos"});
    }
}
