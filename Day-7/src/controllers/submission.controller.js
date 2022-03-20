
const express= require("express");

const router = express.Router();

const Submission = require("../models/submission.model");




router.get("",async(req,res)=>{

    try{
    const submission=await Submission.find().lean().exec();
     return res.status(200).send(submission);
    }
    catch(err){
       return res.status(500).send(err.message);
    }
    
    })

    
    
    router.post("",async(req,res)=>{
    
        try{
            const submission=await Submission.create(req.body)
            return res.status(201).send(submission);
        }
        catch(err){
            return res.status(500).send(err.message);
            }
       
        })



        router.get("/:maxmarks",async(req,res)=>{
            try{
        const batch=await Submission.find().sort({Marks:-1}).limit(1).populate({
        
        path:"studentId",
        select:["rollId","currentBatch"]
        })
        
        
        .lean().exec();
        return res.send(batch);
        
            }catch(err){
                return res.status(500).send(err.message); 
            }
        });



        module.exports=router;