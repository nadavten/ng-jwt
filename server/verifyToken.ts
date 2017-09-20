import {Request,Response,NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from './config';

export function verifyToken(req:Request,res:Response,next:NextFunction){

    const token = req.headers['x-access-token'] as string;

    if(!token){
        return res.status(403).send({auth:false,message:'no token provided'});
    }

    jwt.verify(token,config.secret,(err,decoded:any)=>{

        if(err){
            return res.status(500).send({auth:false,message:'failed to authenticate token'});
        }

        req['userId'] = decoded.id;
        next();
    });
}