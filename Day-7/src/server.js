const app =require("./index")


const connect =require("./configs/db")

app.listen(4000,async(req,res)=>{
   try {
       await connect();
       console.log("listening on port 4000")
       
   } catch (error) {
       console.log(error);
   }

})


