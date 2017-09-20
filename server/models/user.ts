import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{
        type:'string',
        unique:true,
        required:true,
    },
    firstName:{
        type:'string',
    },
    lastName:{
        type:'string',
    },
    password:{
        type:'string',
        required:true,
    }

},{
    timestamps:true,
    collection:'user'
});

export default mongoose.model('user',userSchema);