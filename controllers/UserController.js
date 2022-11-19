const bcrypt = require('bcrypt');
const User = require('../models/UserModel').UserModel;
const UserModelObj = require('../models/UserModel');
const { GenerateJWT } = require('../utils/JwtUtil');

const UserRegister = async (req,res,next) => {
    
      // First Validate The Request
      const { error } = UserModelObj.ValidateUser(req.body);
      if (error) { 
          return res.status(400).json({error:true,message:error.details[0].message});
      }
      // Check if this user already exisits
      let user = await User.findOne({ email: req.body.email });
      if (user) {
          return res.status(400).json({error:true,message:'That user already exisits!'});
      } else {
          // Insert the new user if they do not exist yet
          user = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
          });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          await user.save(); 
         return res.status(201).json({success:true,message:'user register succesfully.'});
      }

}
/*
const CreateSuperAdmin = async (req,res,next) => {
    var user = new User({
        name: 'Super Admin',
        email: 'admin@admin.com',
        password: '123456',
        IsAdmin:true
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save(); 
    return res.status(201).json({success:true,message:'super user register succesfully.'});
}
*/

const UserLogin = async (req,res,next) => {
    
    // First Validate The Request
    const { error } = UserModelObj.ValidateLogin(req.body);
    if (error) { 
        return res.status(400).json({error:true,message:error.details[0].message});
    }
    // Check if this user already exisits
    const payload ={
        email: req.body.email
    }
    let user = await User.findOne(payload);
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({error:true,message:'Incorrect email or password.'});
        }
        const token = GenerateJWT({user_id:user._id,IsAdmin:user?.IsAdmin || false});
        return res.status(200).json({success:true,message:'User Logged in Successfully',token});
    } else {
        return res.status(400).json({error:true,message:'User Not Exists!.'});
    }

}

module.exports = {
    UserRegister,
    UserLogin,
    //CreateSuperAdmin
}
  