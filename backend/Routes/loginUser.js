const express = require('express')
const  router = express.Router()
const User = require("../models/User")

const { body , validationResult} = require("express-validator") // for validation

require('dotenv').config()

const  bcrypt=require("bcryptjs");
let jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.SECRET_KEY;

router.post("/loginuser" ,[body('email' , 'Invalid Email Id').isEmail(),body('password', 'Incorrect Password').isLength({min : 6}) ],async (req,res)=>{

    const errors = validationResult(req) // validating request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }


    try{
        let userData = await User.findOne({email : req.body.email});  // find user by his email in the database

        if(!userData){
            return res.status(400).json({Error : "Invalid Email ID Entered"})
        }

        const pswdCompare =  await bcrypt.compare(req.body.password, userData.password);
        if(!pswdCompare){
            return res.status(400).json({Error : "Invalid Password Entered"})
        }


        // const { name } = userData;
        // console.log("User Data:", userData);

        const data = {
            user:{
                id : userData.id
            }
        }


        // console.log(" Data:", data);

        const authToken = jwt.sign(data,jwtSecretKey)
        return res.json({success : true , authToken : authToken})
    }
        

    catch (error){
        console.log(error);
        res.json({success : false});
    }
})

module.exports = router;