import { Request, Response } from "express";
import { loginReqValidator, patientId, removeLoginReqValidator, removeSpecialistReqValidator, setPatientProfileReqValidator, setQueueReqValidator, specialistByspecialtyReqValidator, specialistReqValidator, specialtyIdReqValidator, specialtyReqValidator, updateLoginReqValidator, updateSpecialtyReqValidator } from "./validator";
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

export const getLogin = (req:Request,res:Response):void => {
    services.getLoginDB()
    .then(resolve=>{
        res.status(200).json(resolve);
    })
    .catch(error=>{
        res.status(400).json(error);
    });
}

export const updateLogin = (req:Request,res:Response):void => {
    const data = updateLoginReqValidator(req.body);
    if(data){
        services.updateLogin(data)
        .then( (resolve) => {
            res.status(200).json(resolve);
        } )
        .catch( (error) => {
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const newLogin = (req:Request,res:Response) => {
    const data = updateLoginReqValidator(req.body);
    if(data){
        services.newLogin(data)
        .then( (resolve) => {
            res.status(200).json(resolve);
        } )
        .catch( (error) => {
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}
export const deleteLogin = (req:Request,res:Response) => {
    const data = removeLoginReqValidator(req.body);
    if(data){
        services.deleteLogin(data)
        .then( (resolve) => {
            res.status(200).json(resolve);
        } )
        .catch( (error) => {
            res.status(400).json(error);
        });
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
        .catch( (error) => {
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const updateSpecialty = (req:Request,res:Response) => {
    const data = updateSpecialtyReqValidator(req.body);
    if(data){
        services.updateSpecialtyDB(data)
        .then( (resolve)=>{
            res.status(200).json(resolve);
        })
        .catch( (error)=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const deleteSpecialty = (req:Request,res:Response) => {
    const data = specialtyIdReqValidator(req.body);
    if(data){
        services.deleteSpecialtyDB(data)
        .then( (resolve)=>{
            res.status(200).json(resolve);
        })
        .catch( (error)=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const specialistByspecialty = (req:Request<{idSpecialty:string}>,res:Response) => {
    const data = specialistByspecialtyReqValidator(req.params);
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

export const specialist = (req:Request,res:Response) => {
    services.specialistDB()
    .then((resolve)=>{
        res.status(200).json(resolve);
    })
    .catch((error)=>{
        res.status(400).json(error);
    });
}

export const setSpecialist = (req:Request,res:Response) => {
    const data = specialistReqValidator(req.body);
    if(data){
        services.setSpecialistDB(data)
        .then((resolve)=>{
            res.status(200).json(resolve);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const updateSpecialist = (req:Request,res:Response) => {
    const data = specialistReqValidator(req.body);
    if(data){
        services.updateSpecialistDB(data)
        .then((resolve)=>{
            res.status(200).json(resolve);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const deleteSpecialist = (req:Request,res:Response) => {
    const data = removeSpecialistReqValidator(req.body);
    if(data){
        services.removeSpecialistDB(data)
        .then((resolve)=>{
            res.status(200).json(resolve);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const setPatient = (req:Request,res:Response) => {
    const profile = setPatientProfileReqValidator(req.body);
    if(profile){
        services.setPatient(profile)
        .then(resolve=>{
            setQueue(req,res);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const getPatient = (req:Request<{dni:string}>,res:Response) => {
    const dni = patientId(req.params);
    if(dni){
        services.getPatient(dni)
        .then(resolve=>{
            res.status(200).json(resolve);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const setQueue = (req:Request, res:Response) => {
    const queue = setQueueReqValidator(req.body);
    if(queue){
        services.setQueue(queue)
        .then(resolve=>{
            res.status(200).json(resolve);
        })
        .catch(error=>{
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({error:"Error in the data structure"});
    }
}

export const getQueue = (req:Request, res:Response) => {
    services.getQueue(req)
    .then(resolve=>{
        res.status(200).json(resolve);
    })
    .catch(error=>{
        res.status(400).json(error);
    });
}