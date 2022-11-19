const Mongoose = require("mongoose");

const ItemSchema=Mongoose.Schema({
    itemName:{
        type:String,
        required:[true,'Minimum 1 Item is required!'],
    },
    price:{
        type:Number,
        required:[true,'Product price is required!'],
    },
    quantity:{
        type:Number,
        required:[true,'Product Quantity is required!'],
    }
})

const OrderSchema = Mongoose.Schema({
    items:{
        type:[ItemSchema],
        required:[true,'Minimum 1 product is required!'],
    },
    address:{
        type:String,
        required:[true,'User Address is required!']
    },
    total: {
        type:Number,
        required:[true,'Total Price is required']
    },
    orderBy: { 
        type: Mongoose.Schema.Types.ObjectId,
        required:[true,'Order Created By, is required'],
        ref: "Users"
    }
}, {
    timestamps: true
});
const OrderModel = new Mongoose.model("Orders",OrderSchema);
module.exports=OrderModel;