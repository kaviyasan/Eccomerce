const product = require('./service');
var shortid = require('shortid');
// const uuid=require("uuid-random");
// const { reset } = require('nodemon');
// const demo=require('./demo')

const saveProduct = async (req, res) => {
    var date = new Date().toLocaleDateString()
    req.body.Date = date
    // req.body.OrderId=uuid()
    req.body.OrderId=shortid.generate()
    var Price=req.body.price*req.body.Quantity
    req.body.Total=Price
    // var priceee=await demo.array
    const productData = await product.saveproductDetails(req.body);
    if (productData) {
        res.send({ code: 200, Message: "saved your order" })
        console.log(productData);
    }
    else {
        res.send({ code: 400, Message: "something went wromg" })
    }
}

const fetchProduct = async (req, res) => {
    let getproduct = await product.fetchproductDetails(req.query)
    
    if(getproduct){
    res.send({ code: 200, data: getproduct })
    console.log(getproduct);
    }
    else{
        res.send({code:400,Message:"something went wrong"})
    }
}

const updateData = async (req, res) => {
    // let orderUpdate = await product.fetchproductDetails(req.body)
    // if (orderUpdate.length!=0) {
        // req.body.OrderId=orderUpdate[0]['OrderID']
        var date = new Date().toLocaleDateString()
        req.body.Date = date;
        var Price=req.body.price*req.body.Quantity
    req.body.Total=Price
        const update = await product.updateproductDetails(req.body) 
        console.log(update);
        if(update){
            res.send({ code: 200, Message: "Updated successfully" })
        }
        else{
            res.send({code:400,Message:"Not update"})
        }
    // } 
    // else{
    //     res.send({code:400,Message:"Something went wrong"})
    // }
}

const DeleteOrder=async(req,res)=>{
    // console.log(req.body);
    // let orderDelete=await product.fetchproductDetails(req.body)
    // if(orderDelete.length!=0){
        // var date=new Date();
        // req.body.Date=date.toISOString().slice(0,10)+" "+date.toISOString().slice(11,19);
        // req.body.OrderId=shortid.generate()
        // req.body.OrderId=uuid()
        const Delete=await product.DeleteOrderdetail(req.body)
        // if(Delete){
            res.send({code:200,Message:"Delete your order"})
        // }
        // else{
        //     res.send({code:400,Message:"Your order is not delete"})
        // }
    // }
    // else{
    //     res.send({code:400,Message:"Something went wrong"})
    // }
}

const countProductNameBasedOnDate=async(req,res)=>{
    try{
    let counteproduct=await product.countProductBasedOnDate(req.query)
    res.send({code:200,"Result":counteproduct})
    console.log(counteproduct);
    }
    catch(err){
        res.send({code:400,Result:"failure"})
    }
}

const countProductBasedOnCustomer=async(req,res)=>{
    try{
     let countProduct=await product.countProductBasedOnCustomer(req.query)
     res.send({code:200,"Result":countProduct})
     console.log(countProduct);
    }
    catch(err){
        res.send({code:400,Message:"failure"})
    }
}

module.exports = {
    saveProduct,
    fetchProduct,
    updateData,
    DeleteOrder,
    countProductNameBasedOnDate,
    countProductBasedOnCustomer
}