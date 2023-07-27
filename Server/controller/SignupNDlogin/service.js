const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    username: String,
    phone_Num:String,
    Email: String,
    Password: String,
    Confirm_Password:String
})
const model = mongoose.model('UserInfo', formSchema);

const saveReisterForm = async (list) => {
    try {
        const product = new model(list);
        const detail = await product.save();
        
            return detail
        }
    catch (err) {
        return false
    }
}

const postLoginForm = async (list) => {
    console.log(list);
    let login 
    if (list) {
        login= await model.aggregate([
            { $match: { "Email": list } }
        ])
        return login
    } else {
        return false
    }
}

const updatePassword=async(data)=>{
    let changepasword
    if (data) {
        changepasword=await model.updateMany(
            {"Email":data.email},
            {$set:{
                "Password":data.hashNewPassword,
                "Confirm_Password":data.hashNewPassword
            }},
            {new:true}
        )
    } else {
        console.log(false);
    }
}

module.exports = {
    saveReisterForm,
    postLoginForm,
    updatePassword
}