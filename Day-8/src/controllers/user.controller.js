const express =require("express");

const User =require("../models/users.model");


 
const transporter = require("../configs/mail");

const router =express.Router();

router.get("/", async(req,res)=>{
    try{
    const page =req.query.page || 1;
    const pagesize =req.query.pagesize || 10;

    const skip =(page-1)*pagesize;
    const users = await User.find()
    .skip(skip)
    .limit(pagesize)
    .lean()
    .exec();
    return res.status(200).send({users:users})
    }catch(err){
        return res.status(500).send(err)
    }

});


router.post("/", async (req, res) => {
    try {
      const user= await User.create(req.body);
  
      transporter.sendMail({
        from: '"Amazon admin" <admin@amazon.com>', // sender address
        to: user.email, // list of receivers
        subject:`Welcome to ABC system ${user.first_name} ${user.last_name}`, // Subject line
        text: `Hi ${user.first_name} Please confirm your email address`,// plain text body
       
      });
    

      transporter.sendMail({
        from: '"Amazon admin" <admin@amazon.com>', // sender address
        to:"cmarlow2@vk.com,tbourke1@springer.com,ksilvers0@1688.com,csharma3@multiply.com,srevelandd@globo.com", // list of receivers
        subject:`${user.first_name} ${user.last_name} has registered with us `, // Subject line
        text: `Please welcome ${user.first_name} ${user.last_name}`,

    });
      return res.status(201).send({ message: "Registered successfully" });

   // return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



module.exports=router;

