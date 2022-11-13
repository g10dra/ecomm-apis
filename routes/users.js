var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')


router.post('/register', function(req, res, next) {
  UserController.UserRegister(req, res, next)
});


router.post('/login', function(req, res, next) {
  const {email,password} = req.body;
  UserController.UserLogin(req, res, next)
});

router.get('/public', function(req, res, next) {
 res.json({status:true,message:'user public route'})
});

module.exports = router;
