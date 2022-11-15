const Mongoose = require("mongoose");
const ProductSchema = Mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required!'],
        minlength:[10,'Minimum length for Title is 10 characters'],        
        maxlength:[100,'Maximum length for Title is 100 characters']
    }, 
    description: {
        type:String,
        required:[true,'About the person is required']
    },
    price: {
        type:Number,
        required:[true,'Price is required']
    },
    image:{
        type:String,
        required:[true,'Image is required']
    },
}, {
    timestamps: true
});
const ProductModel = new Mongoose.model("Products",ProductSchema);
module.exports=ProductModel;