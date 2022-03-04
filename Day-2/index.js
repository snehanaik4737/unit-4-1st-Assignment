
const express = require("express");

const app = express();
//console.log(app);


app.get("",function(req,res){
res.send("Hello");
})


app.get("/books", function(req,res){
    res.send({book1:"Harry potter", book2:"Gitanjali",book3:"Sapiens",book4:"Pride and Prejudice"})
});

app.listen(4001,()=>{
    console.log("Listening on port 4000")
})
