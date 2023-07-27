const app=require("express")();
const bodyParser=require("body-parser");
const cors=require('cors')

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','POST,GET,PUT,OPTION,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-type, Accept, authentication-token, application/json, charset=utf-8')
    next();
})

require("dotenv").config()
require("./router/link")(app);
require("./config/mongodb");
// require("./controller/order/demo")

const PORT=5000;
app.listen(PORT, ()=>{
    console.log(`Server is run ${PORT}`);
})
