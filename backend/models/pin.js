const mongoose = require('mongoose');


const pinSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please enter your username']
    },
    title:{
        type:String,
        required:[true, 'Please enter your title'],
        min:[3,'Title must be longer than 3 characters']
    },
    desc:{
        type:String,
        required:true,
        min:[3,'Describtion must be longer than 3 characters']
    },
    rating:{
        type:Number,
        required:[true, 'Please enter rating'],
        max:5,
        min:0
    },
    lat:{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    }

},{timestamps:true})


module.exports = mongoose.model('Pin',pinSchema);