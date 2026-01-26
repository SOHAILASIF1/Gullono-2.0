import mongoose, { Mongoose } from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        
    },
    role:{
        type:String
    }
})
const User=mongoose.model("Users",userSchema)
export default User