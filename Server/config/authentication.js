  const JWT=require("jsonwebtoken")
const verifyToken= (req, res, next)=>{
  console.log(req.headers);
 var token=req.headers['authorization']; 
 console.log(token);
 if(token){
    var newToken=token.split(" ")[1];
    console.log(token.split(" ")[1]);
 }

 
 JWT.verify(newToken,process.env.JWT_SECRET_KEY, function(err,decoded){
    if(err){
        // console.log(err);
        res.send({code:401, message:"access denied"})
        return;
    }
    else{
        console.log("verified your token");
        next();
    }
    
 })
 
}
module.exports=verifyToken