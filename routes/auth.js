const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

//POST//register//
router.post("/register",async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const hash = await bcrypt.hash(password,10);
        
        const newUser = new User({username,email,password:hash});
        await newUser.save();

        res.status(201).json({message : `Register successfull welcome ${username}`});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

//LOGIN//
router.post("/login", async(req,res)=>{
    console.log("REQ.BODY:", req.body);
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) throw new Error ("User not found");

        const isPasswordOk = await bcrypt.compare(password,user.password);
        if (!isPasswordOk) throw new Error ("Your password is incorrect");

        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn : "1h"})
    
        res.json({message : `Login successfull !`,token ,username: user.username});
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

//GET(id)//


//PUT(id)//


//DELETE//

module.exports = router;
