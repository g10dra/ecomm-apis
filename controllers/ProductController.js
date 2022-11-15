const ProductModel = require('../models/ProductModel'); 
 
const createProduct = (req, res) => {
    //check existing is alreday in database
    ProductModel.find().and([{ title: req.body.title }])
        .then(product => {
            if (product.length == 0) {
                // Create a product
                if (!req.file) {  
                    response = { error: true, message: "you have not uploaded image" }
                    return res.status(400).json(response);
                }
                else {
                    req.body.image = req.file.filename;
                    const product = new ProductModel(req.body);
                    // Save product in the database
                    product.save()
                        .then(data => {
                            if (data['_id']) {
                                return res.status(201).json({
                                    success: true,
                                    message: "Product created Successfully."
                                })
                            }
                        }).catch(err => {
                            return res.status(500).json({
                                error:true,
                                message: err.message || "Some error occurred while creating the Product."
                            });
                        });

                }

            } else {
                return res.status(500).json({
                    error:true,
                    message: 'Product already exist with same title,try some unique product name.'
                });
            }

        }).catch(err => {
            return res.status(500).json({
                error:true,
                message: "Err:" + err
            });
        });


};

const updateProduct = (req, res) => {

    ProductModel.findOne({
        _id: req.params.Id
    },{}).then(response => {
        
            if (response.length === 0) {
                return res.status(404).json({
                    error:true,
                    message: 'There is no product.'
                });
            } else {

                const update = {
                    title: req.body.title,
                    price: req.body.price, 
                    description: req.body.description
                }

                //check if any file(s) are uploaded
                if (req.file) {
                    //check if image is uploaded the simply update, else it will remain same in db
                    if (req.file) {
                        update.image = req.file.filename;
                    }
                }
               
                ProductModel.findOneAndUpdate({
                    _id: req.params.Id,
                 },
                    update,
                    { new: true })
                    .then(response => {
                        if(response){
                            return res.json({
                                success: true,
                                message: "Product updated successfully"
                            });
                        }else{
                            return res.status(500).json({
                                error:true,
                                message: "Product did not update!"
                            });
                        }
                        
                    }).catch(err => { 
                        return res.status(500).json({
                            error:true, 
                            details:err,
                            message: "Product updation failed!"
                        });
                    });

            }

        }).catch(err => {
            return res.status(500).json({
                error:true,
                message: "Unknow err:" + err
            });
        });
};

const getAllProducts = async (req, res) => {
    
    const limit = req.body.pageSize || 10; //how much records we want want to return in 1 page, per page value
    const pageNumber = req.body.page || 1;
    const skip = parseInt(pageNumber-1) * parseInt(limit); 
    const conditions = {};
    const pagingQuery = { skip, limit };
    const allfilters = req.body.filters || [];

    //filters:[{field:'title',value:'sample product'},{field:'description',value:'sample product description'}]

    if (allfilters.length) {
        allfilters.forEach(item => {
            conditions[item.field] = { $regex: item.value }
        })
    }

    //orderBy:{field:'title',orderDirection:'asc'} //asc/desc
    let orderBy;
    if (req.body.orderBy) {
        orderBy = { [req.body.orderBy.field]: req.body.orderBy.orderDirection === 'asc' ? 1 : -1 }
    } else {
        orderBy = { '_id': -1 };
    }
    //console.log('conditions',conditions,'pagingQuery',pagingQuery,'orderBy',orderBy)
    const total = await ProductModel.find(conditions, {}).countDocuments();
    ProductModel.find(conditions, {}, pagingQuery).sort(orderBy)
        .then(products => {
            return res.json({
                success:true,
                products,
                total
            });
        }).catch(err => {
            return res.status(500).send({
                error:true,
                message: "Unknow err:" + err
            });
        });

};

const getSingleProduct = (req, res) => {
    // get a single Product
    ProductModel.findOne({
        _id: req.params.Id,
    }, {})
        .then(response => {
            return res.json({
                success:true,
                data:response
            });
        }).catch(err => {
            return res.status(500).send({
                error:true,
                message: "Unknow err:" + err
            });
        });
};

const deleteProduct = (req, res) => {
    // get a single Product
    ProductModel.deleteOne({
        _id: req.params.Id,
    }).then(response => {
            return res.json({
                success:true,
                message:'Product Deleted Successfully.'
            });
        }).catch(err => {
            return res.status(500).send({
                error:true,
                message: "Unknow err:" + err
            });
        });
};

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
}
  