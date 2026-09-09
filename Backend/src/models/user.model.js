import mongoose, { model, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
        trim: true,
        unique:true
    },
    email:{
        type:String,
        required : true,
        trim: true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        minlength:6
    },
    verified:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
)

const userModel = mongoose.model("users",userSchema)

export default userModel