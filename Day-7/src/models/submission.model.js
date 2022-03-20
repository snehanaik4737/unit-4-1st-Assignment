

const mongoose=require("mongoose");

    const submissionSchema= new mongoose.Schema({
        evaluation_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"evaluation",
            required:true,
        },
        studentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student",
            required:true
        },
         Marks:{type:Number,required:true}
            
       },
            {
                timestamps:true,
                versionKey:false
            })
            
    const Submission =mongoose.model("submission", submissionSchema);


    module.exports=Submission;
