const nodemailer=require("nodemailer")  

const sendMail=(userData)=>{
    console.log(userData);
    let transporter=nodemailer.createTransport({
        host:process.env.smtp_out,
        port:process.env.mail_port,
        secure:process.env.mail_port===587?true:false,
        auth:{
            user:process.env.admin_mail_id,
            pass:process.env.admin_pwd
        }
    })
    console.log(transporter);

    let message={
        from:process.env.admin_mail_id,
        to:userData.to,
        subject:userData.subject,
        html:userData.content
    }

    transporter.sendMail(message,err=>{
        console.log(message);
        if (err) {
            return false
        }

    })
}

module.exports=sendMail