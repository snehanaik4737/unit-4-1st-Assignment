const express = require("express");

const User =require("../models/user.models");

const { body, validationResult } = require("express-validator");


const router=express.Router();


router.post("/",
body("first_name").not().isEmpty(),
body("last_name").not().isEmpty(),
body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
    body("age").not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
   body("pincode").not()
   .isEmpty()
   .custom((value)=>{
    if (value && value.length !== 6){
        throw new Error("Invalid pincode");
    }
    return true;
   }),
   body("gender").not()
   .isEmpty()
   .custom((value)=>{
       if(value !=="Male" && value !=="Female" && value !=="Others"){
        throw new Error("Invalid gender");
       }
       return true;
   }),

async (req, res) => {
    try {
     // console.log(body("firstName"));
      const errors = validationResult(req);
     // console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
)


module.exports = router;