const mongoose=require("mongoose");
const adminScema=require("../controller/admin/service")

const dbURL="mongodb://localhost:27017/HomeAppliance";
mongoose.connect(dbURL, {
    // useNewUrlParser:true,
    // useUnifiedTopology:true
},
    async (err)=>{
    if(err){
        console.log("MongoDb is not connect");
    }
    else{
        console.log("MongoDb is connect");
    }
})

