const service=require("./service")

const saveRegister=async(req,res)=>{
    // const insert=await 
    let savedata=await service.adminDetailSave()
        res.send({code:200,Message:"success"})
        console.log(savedata);
    
}

const loginForadmin=async(req,res)=>{
    var Email=req.body.Email
    var Password=req.body.Password
    let login = await service.loginAdmin(Email)
    if(login.length==0){
        res.send({code:400,Message:"Email is not correct"})
    }
    else{
        if(Password==login[0].Password){
            res.send({code:200,Message:"Login successful"})
        }
        else{
            res.send({code:400,Message:"Password is not corect"})
        }
    }
}

module.exports={
    saveRegister,
    loginForadmin
}