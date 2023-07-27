const service=require("./service");
 
function sleep(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms)
    })
}

let calculation=async(data)=>{
    await sleep(10000)

    var date = new Date().toLocaleDateString()
    data.Date = date
}