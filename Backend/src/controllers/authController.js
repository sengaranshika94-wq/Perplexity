import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../services/mail.service.js'
async function registerController(req,res){

    const {username,email,password}= req.body

    const UserExist= await userModel.findOne({
        $or:[{username},{email}]
    })

    if(UserExist){
        return res.status(400).json({
            message:"user already exist",
            success:false,
            html:"<h1>User already Exist! </h1>"
        })
    }

    const hashPassword= await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    })

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity!",
        html:`<p>hi ${username},</p>
        <p>Thank you for regestring at<strong>Perplexity</strong></p>`
    })

    return res.status(201).json({
        message:"UserCreated Successfully",
        success:true,
        html:"<h1>User Created! </h1>",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export default registerController