



const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

const passport =require("passport")


const User =require("../models/user.model")

const { v4: uuidv4 } = require('uuid');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile, cb) {


   // console.log(profile._json.email)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    let user = await User.findOne({email:profile?._json?.email}).lean().exec() 
    

    if(!user){
        user =await User.create({
            email:profile._json.email,
            password:uuidv4(),
            role:["customer"]
        })
    }
    
    
    return cb(null, user);
    // });
  }
));


module.exports=passport;