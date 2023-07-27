const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
    Email:String,
    Password:String
})
const model=mongoose.model("admin",adminSchema);

const adminDetailSave=async(data)=>{
        const insert=await model.insertMany([
            {Email:"kaviyakavi130@gmail.com",Password:"kaviyasang1210"},
            {Email:"kaviyaanj2002@gmail.com",Password:"kaviyasangeeth1210"}
        ])
        console.log(insert);
    return insert
}

const loginAdmin=async(data)=>{
     const login=await model.aggregate([
        {$match:{"Email":data}}
     ])
     return login
}

module.exports={
    adminDetailSave,
    loginAdmin,
    model
}