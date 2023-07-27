// const string = require('@hapi/joi/lib/types/string');
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    ProductId: String, 
    category:String,
    productname: String,
    quantity: String,
    // price: String,
    price:Number,
    // isActive: Boolean
    Image:String
});

const model = mongoose.model("productdetail", productSchema);

const saveproductsdetails = async (data) => {
    try {

        const product = new model(data);
        const savedata = await product.save();
        return savedata;
    } catch (err) {
        return false
    }
};

const getproductdetails = async (data) => {
    console.log(data);
    try {

        var query = [];
        let product;

        // if (data.ProductId) {
        //     // query.push({ $match: { "isActive": true } });
        //     query.push({ $match: { "ProductId": data.ProductId } })
        //     product = await model.aggregate([
        //         query
        //     ]);
        // }
        // else {
        //     query.push({ $match: { "isActive": true } });
        //     product = await model.aggregate([
        //         query
        //     ]);
            product = await model.find({})
            console.log(product);
        // }
        return product;
    } catch (err) {
        return false
    }
};

const updateproductdetails = async (data) => {
    try {
        const users = await model.updateMany(
            { ProductId: data.ProductId },
            {
                $set: {
                    "productname": data.productname,
                    "catagory":data.catagory,
                    "price": data.price,
                    "quantity": data.quantity,
                    "Image":data.Image
                    // "isActive":data.isActive
                }
            },
            {new:true}
        );

        return users;
    } catch (err) {
        return false
    }
};


module.exports = {
    saveproductsdetails,
    getproductdetails,
    updateproductdetails  
}