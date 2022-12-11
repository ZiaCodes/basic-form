const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userDetails = mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required: true
    },
    email:{
        type : String,
        trim: true,
        unique: true,
        required: true
    },
    phoneNumber:{
        type : Number,
        trim: true,
        unique: true,
        required: true
    },
    gender:{
        type : String,
        required: true
    },
    age:{
        trim: true,
        type : Number,
        required: true
    },
    company:{
        type : String,
        trim: true
    },
    password:{
        type:String,
        required: true
    },
    isVerified:{
        type : Boolean,
        required: true,
        default: false
    }
})


// hashing password if modified
userDetails.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 10);
    }

    next();
})

userDetails.methods.comparePassword = async function(password) {
    const result = await bcrypt.compare(password , this.password);
    return result;
 }

const User = new mongoose.model('User', userDetails);
module.exports = User;