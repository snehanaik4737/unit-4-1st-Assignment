
const express= require("express");

const router = express.Router();

const Evaluation = require("../models/evaluation.model");




router.get("",async(req,res)=>{

    try{
    const evaluation=await Evaluation.find().lean().exec();
     return res.status(200).send(evaluation);
    }
    catch(err){
       return res.status(500).send(err.message);
    }
    
    })

    
    
    router.post("",async(req,res)=>{
    
        try{
            const evaluation=await  Evaluation.create(req.body)
            return res.status(201).send(evaluation);
        }
        catch(err){
            return res.status(500).send(err.message);
            }
       
        })
       

       
    
        router.get("/:id",async(req,res)=>{
            try{
        const batch=await Evaluation.findById(req.params.id).populate({
        
        path:"instructorId",
        select:{firstname:1}
        
        
        }).populate({
            path:"batchId",
            select:{studentId:1}
        })
        .lean().exec();
        return res.status(200).send(batch);
        
            }catch(err){
                return res.status(500).send(err.message); 
            }
        });


        module.exports=router;