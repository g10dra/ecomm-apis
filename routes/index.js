var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req)
  res.status(200).json({success:true,message:"Valid Token now accessing Home page api!",userID:req.currentUserId});
});

router.get('/userOrders', function(req, res, next) {
  //console.log(req.headers)
  res.status(200).json({success:true,message:"Valid Token now accessing Home page api!",fakeOrders:[{orderId:'3333',product:'Badminton'},{orderId:'4444',product:'Tennis racket'}],userID:req.currentUserId});

});

module.exports = router;
