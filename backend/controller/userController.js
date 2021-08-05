const User = require('../models/user');
const cloudinary = require('cloudinary')

const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const { findOne } = require('../models/pin');


// register new user  => api/v1/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // })

    const {username,email,password} = req.body;

    const user =  await User.create({
        username,
        email,
        password,
        avatar:{
            public_id: 12312321,
            url:'ssadas'
        }
    })  
    sendToken(user,200,res);
})

//login user => api/v1/login

exports.userLogin = catchAsyncError(async(req,res,next)=>{
    const{username,password}= req.body;

    if(!username|| !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }
    //finding user in db
    const user = await User.findOne({username}).select('+password')
    
    if(!user){
        return   next(ErrorHandler('Invalid Email or Password',401))
    }
     //checks if password correct or not
     const isPasswordMatched = await user.comparePassword(password); 

     if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }

    sendToken(user,200,res)
})


exports.logout = catchAsyncError(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'Logged out'
    })

})




