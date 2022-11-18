const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    IsAdmin:{
       type:Boolean,
       default:false
    }
});

const UserModel = mongoose.model('Users', UserSchema);

const ValidateUser = (userData) => { 
    const ValidationRulesSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return ValidationRulesSchema.validate(userData);
}

const ValidateLogin = (userData) => { 
    const ValidationRulesSchema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return ValidationRulesSchema.validate(userData);
}

module.exports={
    UserModel,
    ValidateUser,
    ValidateLogin
}