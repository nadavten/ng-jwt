import * as console from 'console';
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import User from './models/user';
import * as jwt from 'jsonwebtoken';
import {config} from './config';
import {verifyToken} from './verifyToken';

const _router = express.Router();

function generateToken(user) {

    const obj = {id:user._id};
    const token = jwt.sign(obj,config.secret,{ 
        expiresIn: config.tokenExpirationInSec
    });

    return token;
}

_router.post('/register',(req,res)=>{

    const hashPassword = bcrypt.hashSync(req.body.password,8);

    User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashPassword
    },(err,user)=>{

        if(err){
            return res.status(500).send({auth:false,message:'there was problem registering user'});
        }

        const token = generateToken(user);

        res.status(200).send({auth:true,token:token});
    });

});

_router.get('/user',verifyToken,(req,res)=>{

    User.findById(req['userId'],{password:0},(err,user)=>{

        if(err){
            return res.status(500).send({auth:false,message:'there was a problem finding user'});
        }

        if(!user){
            return res.status(404).send({auth:false,message:'user not found'});
        }

        res.status(200).send({auth:true,user:user});
    });

});

_router.post('/login',(req,res)=>{

    User.findOne({email:req.body.email},(err,user)=>{

        if(err){
            return res.status(500).send({auth:false,message:'server error'});
        }

        if(!user){
            return res.status(404).send({auth:false,message:'no user found'});
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password,user['password']);
        if(!isPasswordValid){
            return res.status(401).send({auth:false,message:'invalid password'});
        }

        const token = generateToken(user);

        res.status(200).send({auth:true,token:token});

    });
});

export const authController = _router;