const express=require("express");
const router=express.Router();
const upload=require("./../multer/upload");
const product=require("./../controller/ExceltoDb/index")
const SignNDlogin=require("./../controller/SignupNDlogin/index");
const order=require("./../controller/order/index")
const admin=require("./../controller/admin/index")
const auth=require("./../config/authentication")

let routes=(app)=>{
    router.post("/upload", upload.single("productFile"),product.uploadproductinfo);
    router.get("/fetchProduct",auth,product.getproduct)
    // router.post("/send",controller.sen
    router.post("/productOrder",auth,order.saveProduct);
    router.put("/updateorder",auth,order.updateData);
    router.post("/deleteorder",auth,order.DeleteOrder);
    router.post("/register",SignNDlogin.Registration);
    router.post("/login",SignNDlogin.loginForm);
    router.post("/admin",admin.saveRegister)
    router.post("/loginForADMIN",admin.loginForadmin);
    router.post("/forgotPassword",SignNDlogin.forgotPassword)
    router.post("/resetPassword",auth,SignNDlogin.resetPassword)

    router.get("/getproduct",auth,order.fetchProduct)
    router.get("/countproduct",auth,order.countProductNameBasedOnDate)
    router.get("/countProductByCustomer",auth,order.countProductBasedOnCustomer)

    app.use("/api", router);
}

module.exports=routes