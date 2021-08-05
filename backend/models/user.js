const mongoose = require ('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter your name'],
        maxLenght:[30,'Your name cannot exeed 30 charcters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Please enter valid email adress'],
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:[6,'Your password must be longer than 6 charcter'],
        select:false
       
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
   
}, {timestamps:true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})
//return jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

//compare password
userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model('User',userSchema)
