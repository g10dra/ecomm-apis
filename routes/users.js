var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')


router.post('/register', function(req, res, next) {
  UserController.UserRegister(req, res, next)
});


router.post('/login', function(req, res, next) { 
  UserController.UserLogin(req, res, next)
});

/*router.get('/create-super-admin', function(req,res,next){
  UserController.CreateSuperAdmin(req,res,next)
} )*/




module.exports = router;
