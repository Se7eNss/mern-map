const jwt = require('jsonwebtoken');

const catchAsyncError = require('./catchAsyncError');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

//check user if authenticated or not 

exports.isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const{token}=req.cookies;

    
    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await  User.findById(decoded.id);

    next()
})