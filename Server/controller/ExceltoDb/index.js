const service=require("./service"); 
const CSVtoJSON=require("csvtojson");

const uploadproductinfo = async (req, res) => {
    try {
      if (req.file == undefined) {
        res.send({code:400,Message:"Please upload a CSV file!"});
      }
      let path = "./images/" + req.file.filename;          
      const products = await CSVtoJSON().fromFile(path);
      for(item of products)
      {
        const checkExists = await service.getproductdetails({ProductId:item.ProductId})
        if(checkExists.length===0)
        {
        const createproducts = await service.saveproductsdetails(item)
        }
        else
        {
        const updateproduct = await service.updateproductdetails(item)
        }
      }
      res.send({ code: 200, result: "Success", message: "Product Upload Successfully !!!"});
  
    } catch (error) {
      res.status(500).send({
        message: "Could not upload the file!!" });
    }
  };

  const getproduct=async(req,res)=>{
    let product=await service.getproductdetails(req.body);
    console.log(product);
    if(product){
      res.send({code:200,Result:product})    
    }
    else{
      res.send({code:400,Message:"Can't fetch the product details"})
    }
  }



module.exports={
    uploadproductinfo,
    getproduct
};