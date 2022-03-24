 const app = require("./index");

 const connect=require("./configs/db");


 app.listen(5000,async(req,res)=>{
     try {
         await connect();
         console.log("Listening on port 5000")
     } catch (error) {
         console.log({messege:error.message})
     }
 })

 