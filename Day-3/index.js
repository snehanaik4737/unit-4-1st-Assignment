const express = require("express");

const app = express();
//console.log(app);


app.get("/books",allbooks,function(req,res){
  // console.log("Fetching all books");
})

function allbooks(){
   console.log("Fetching all Books");
}


app.get("/book/:name",singleBook("HarryPotter"),function(req,res){
     res.send({bookname:req.name});
})

function singleBook(book){
  return function logger1(req,res,next){
   // console.log(req.params.name)
      if(book==req.params.name) {
    
       //  next();
        req.name =req.params.name;
        next();
      }
  }
}

app.listen(4001,()=>{
    console.log("Listening on port 4000")
})
