var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/OrderController')


router.post('/', function(req, res, next) {//create order
  OrderController.createOrder(req, res, next)
});

router.get('/', function(req, res, next) {//fetch all information
  OrderController.getAllOrders(req, res, next)
});

module.exports = router;