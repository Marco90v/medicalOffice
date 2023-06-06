import { Request, Response } from "express";
import { loginReqValidator, specialistByspecialtyReqValidator, specialtyReqValidator } from "./validator";
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
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const specialty = (req:Request,res:Response):void => {
    services.getSpecialtyDB()
    .then((resolve)=>{
        res.status(200).json(resolve);
    })
    .catch((error)=>{
        res.status(400).json(error);
    });
}

export const setSpecialty = (req:Request,res:Response) => {
    const data = specialtyReqValidator(req.body);
    if(data){
        services.setSpecialtyDB(data)
        .then( (resolve) => {
            res.status(200).json(resolve);
        } )
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const specialistByspecialty = (req:Request,res:Response) => {
    const data = specialistByspecialtyReqValidator(req.body);
    if(data){
        services.specialistByspecialtyDB(data)
        .then((resolve)=>{
            res.status(200).json(resolve);
        })
        .catch((error)=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}
