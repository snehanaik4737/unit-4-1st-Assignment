const mongoose =require("mongoose");

 const userSchema= new mongoose.Schema({
        firstName:{type:String, required:true},
        lastName:{type:String,required:true},
        gender:{type:String,required:true},
        dateOfBirth:{type:String,required:true},
        usertype:
        {type:String,
        required:true,
        enum:["student","instructor"],
        default:"student"
        }
    
    },{
        versionKey:false,
        timestamps:true
    
    })
    
    const User = mongoose.model("user",userSchema);


    module.exports=User;