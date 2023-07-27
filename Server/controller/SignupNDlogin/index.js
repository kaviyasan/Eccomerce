const register = require("./service");
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const sendmail=require("./../../config/NODEMAILER.JS")
const jwtDecode=require("jwt-decode")

const Registration = async (req, res) => {
    if (req.body.Password == req.body.Confirm_Password) {
        const salt = await bcrypt.genSalt(10)
        var hashPassword = await bcrypt.hash(req.body.Password, salt)
        req.body.Password = hashPassword
        req.body.Confirm_Password = hashPassword
        let register1 = await register.saveReisterForm(req.body)
        console.log(register1);
        res.send({ code: 200, Message: "saved" })
    }
    else if (req.body.Password !== req.body.Confirm_Password) {
        res.send("password is not match")
    }
    else {
        res.send({ code: 400, Message: "Not saved" })
    }
}

const loginForm = async (req, res) => {
    // const salt=await bcrypt.genSalt(10)
    //     const hashPassword=await bcrypt.hash(req.body.Password, salt)
    //     req.body.Password=hashPassword
    var username = req.body.username
    var Email = req.body.Email;
    var Password = req.body.Password
    // console.log(Password);
    let login = await register.postLoginForm(Email)
    if (login.length == 0) {
        res.send({ code: 400, Message: "Email is incorrect" })
        console.log("Email is incorrect");
    }


    if (username == login[0].username) {
        var match = await bcrypt.compare(req.body.Password, login[0].Password)
        // console.log(match);
        if (match) {
            const token = JWT.sign({ Email }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" });
            res.send({ code: 200, Message: "Successfully login", TOKEN: token })
            // console.log(token);
        }
        else {
            res.send({ code: 400, Message: "Password is incorrect" })
            console.log("Password is not match");
        }
    }
    else {
        res.send({ code: 400, Message: "Username is incorrect" })
    }
}


const forgotPassword = async (req, res) => {

    try {
        if (req.body.Email) {
            console.log(req.body.Email);
            var email = req.body.Email
            const checkEmail = await register.postLoginForm(email)
            console.log(checkEmail);
            if (checkEmail.length != 0) {
                let setToken = JWT.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "5m" })
                if (setToken) {
                    const linkForResetPassword = `http://localhost:4200/resetPassword?token=${setToken}`

                    const message = `
                <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password, it will expire in 5 minutes</p>
            <a href=${linkForResetPassword} clicktracking=off>${linkForResetPassword}</a>
                `
                   if (linkForResetPassword!="") {
                    sendmail({
                        to:email,
                        subject:"Password reset request",
                        content:message
                    })
                    res.send({Message:"Successfully send message to your mail id",token:setToken})
                   } else {
                    sendmail({
                        error:"something went wrong"
                    }
                    )
                    res.send({Message:"something went wrong"})
                   }

                   

                }
            } 
        }
        else {
                res.send({ message: "Mail id is not found" })
            }
        
    } catch (error) {
        res.send({ message: "something went wrong" })
        console.log(error);
    }

}

const resetPassword=async(req,res)=>{
    console.log(req);
    console.log(req.body)
   const email=jwtDecode(req.headers.authorization).email
   if (email!=undefined) {
    const verifyEmail=await register.postLoginForm(email)
    console.log(verifyEmail);
    if (verifyEmail.length!=0) {
        var newPassword=req.body.Password
        var confirmPassword=req.body.Confirm_Password
        if (newPassword==confirmPassword&newPassword!=undefined&confirmPassword!=undefined) {
            const salt=await bcrypt.genSalt(10)
            const hashNewPassword=await bcrypt.hash(newPassword,salt)
            console.log(hashNewPassword);
            const changePassword=await register.updatePassword({email,hashNewPassword})
          
            console.log(changePassword);
            res.send({Message:"Successfully reset your password"})
        }
        else{
            res.send({Message:"Please give same password to new password and confirm password "})
        }
    }
    else{
        res.send({Message:"Mail id is not found, please try again"})
    }
   }
   console.log(email);
}

module.exports = {
    Registration,
    loginForm,
    forgotPassword,
    resetPassword
}