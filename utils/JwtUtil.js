var jwt = require('jsonwebtoken');
const conf = require('../config/conf.js');

const GenerateJWT = (payload) => {
   return jwt.sign(payload, conf.secretKey, {
       expiresIn: 3600*24*5 // expires in 5 days
   });
 };

const ValidateJWT = (token,callback) => {
   jwt.verify(token, conf.secretKey, callback);
};

module.exports = {
 GenerateJWT,
 ValidateJWT
};
