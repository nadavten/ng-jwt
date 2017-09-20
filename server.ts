import * as mongoose from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { authController } from './server/auth.controller';
import { config } from './server/config';

mongoose.connect(config.connectionString,{useMongoClient:true});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/dist'));

app.use('/api/auth',authController);

app.all('*',(req,res)=>{
    res.status(200).sendFile(__dirname+'/dist/index.index.html');
})

app.listen(config.port,(err)=>{

    console.log(`listen on port ${config.port}`);
});