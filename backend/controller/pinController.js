const Pin = require('../models/pin');


const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');


// create a new pin =>  api/v1/pins

exports.newPin =  catchAsyncError(async(req,res,next)=>{
    
   
        const savedPin = await Pin.create(req.body)
        res.status(200).json(savedPin)
    
})


// get all pins =>  api/v1/pins
exports.getAllPins = catchAsyncError(async(req,res,next)=>{
    const pins = await Pin.find();

    if(!pins){
        return next(new ErrorHandler('No pins Founded',404))
    }
    res.status(200).json({
        pins
    })

})