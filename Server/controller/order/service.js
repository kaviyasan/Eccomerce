const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    OrderId: String,
    Date: String,
    productname: String,
    price: Number,
    Quantity:Number,
    Total:Number,
    Image:String
})
const model = mongoose.model("OrderDetail", productSchema)

const saveproductDetails = async (data) => {
    try {
        const detail = new model(data);
        const saveDetail = await detail.save();
        return saveDetail
    }
    catch (err) {
        return false
    }
}

const fetchproductDetails=async(fetch)=>{
    let getdata;
    if(fetch.OrderId){
        getdata=await model.aggregate([
            {$match:{OrderId:fetch.OrderId}}
        ])
    }
    if(fetch.Customer){
        getdata=await model.aggregate([
            {$match:{Customer:fetch.Customer}}
        ])
    }
    if(fetch.productname){
        getdata=await model.aggregate([
            {$match:{productname:fetch.productname}}
        ])
    }
    
    // if(fetch.Date){
    //     getdata=await model.aggregate([
    //         {$match:{Date:fetch.Date}},
    //         {$group:{_id:{ProductName:"$ProductName"}}},
    //         {$count:"ProductCount"}
    //     ])
    // }
    else{
        getdata=await model.find({})
    }
    return getdata
}

const updateproductDetails=async(data)=>{
    try{
        console.log(data);
    updatedata=await model.findOneAndUpdate(
        {"OrderId":data.OrderId},
        {$set:{
            // "Id":data.Id,
            "Date":data.Date,
            // "Customer":data.Customer,
            "productname":data.productname,
            "price":data.price,
            "Quantity":data.Quantity,
            "Total":data.Total,
            "Comment":data.Comment,
            "Image":data.Image
        }},
        {new:true}
    )
    return updatedata;
    }
    catch(err){
        return false
    }
}

const DeleteOrderdetail=async(data)=>{
    try{
        const Deletedata=await model.deleteMany(
            {"OrderId":data.OrderId,
            "Date":data.Date,
            "Customer":data.Customer,
            "productname":data.productname,
            "price":data.price,
            "Quantity":data.Quantity,
            "Comment":data.Comment
        })
        return Deletedata
    }
    catch(err){
        return false
    }
}

const countProductBasedOnDate=async(data)=>{
    let countproduct
    if(data.Date){
         countproduct=await model.aggregate([
            {$match:{Date:data.Date}},
            {$group:{_id:{Date:"$Date"},ProductCount:{$sum:"$Quantity"}}}
        ])
    }
    // else{
    //     countproduct=await model.find({})
    // }
    return countproduct 
}

const countProductBasedOnCustomer=async(data)=>{
    let NumofProduct
    if(data.Customer)
       NumofProduct =await model.aggregate([
          {$match:{Customer:data.Customer}},
        //   {$group:{_id:{ProductName:"$ProductName"}}},
        //     {$count:"ProductCount"}
        {$group:{_id:{Customer:"$Customer"},ProductCount:{$sum:"$Quantity"}}}
    ])
    // else{
    //     NumofProduct = await model.find({})
    // }
    return NumofProduct
}

module.exports={
   saveproductDetails ,
   fetchproductDetails,
   updateproductDetails,
   DeleteOrderdetail,
   countProductBasedOnDate,
   countProductBasedOnCustomer
}