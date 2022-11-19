const OrderModel = require('../models/OrderModel'); 
 
const createOrder = (req, res) => {
    
    const payload=req.body;
    var total=0;
    payload.items.forEach(item=>{
        total+=Number(item.price)*Number(item.quantity)
    });
    payload.total=total; 
    payload.orderBy=req.currentUserId;

    //console.log(payload)
    //sample payload
    /*
        {	
            "items":[{
                "itemName":"My product 1",
                "price":110,
                "quantity":2
            }],
            "address":"1017 Tuip le park Hyderabad"
        }
    */



    const Order = new OrderModel(payload);
    // Save Order in the database
    Order.save()
        .then(data => {
            if (data['_id']) {
                return res.status(201).json({
                    success: true,
                    message: "Order created Successfully."
                })
            }
        }).catch(err => {
            return res.status(500).json({
                error:true,
                message: err.message || "Some error occurred while creating the Order."
            });
        });
           
};

const getAllOrders = async (req, res) => {
    
    const limit = req.body.pageSize || 10; //how much records we want want to return in 1 page, per page value
    const pageNumber = req.body.page || 1;
    const skip = parseInt(pageNumber-1) * parseInt(limit); 
    const conditions = {orderBy:req.currentUserId};
    const pagingQuery = { skip, limit };
    let orderBy = { '_id': -1 };
    const total = await OrderModel.find(conditions, {}).countDocuments();
    OrderModel.find(conditions, {}, pagingQuery).sort(orderBy) 
    .populate("orderBy","name")
        .then(orders => {
            return res.json({
                success:true,
                orders,
                total
            });
        }).catch(err => {
            return res.status(500).send({
                error:true,
                message: "Unknow err:" + err
            });
        });

};
 
module.exports = {
    createOrder, 
    getAllOrders, 
}
  