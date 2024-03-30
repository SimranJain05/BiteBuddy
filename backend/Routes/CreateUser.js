const express = require('express');
const  router = express.Router()
const User = require("../models/User")

const { body , validationResult} = require("express-validator") // for validation


const  bcrypt=require("bcryptjs");

// E.g. body('password').isLength({min : 5})    if pswd length is less than 5, in error it will give 'Invalid value' as msg , to change this we can use
// body('password', 'Incorrect Password').isLength({min : 5}) now it pswd is invalid, it will show "incorrect password" in msg feild of error

router.post("/createuser", [body('email').isEmail().withMessage('Invalid Email Format') ,body('password', 'Incorrect Password').isLength({min : 6}).withMessage('Password must be atleast 6 character long') ],async (req,res)=>{

    const errors = validationResult(req) // validating request
    if (!errors.isEmpty()) {
        // alert("Incorrect mail id");
        return res.status(400).json({ errors : errors.array() });
    }

    const salt = await  bcrypt.genSalt(10);   // can take any number in ()
    let securePassword = await bcrypt.hash(req.body.password,salt);  // to generate hash value of password

    try{
        await User.create({
           
            // name : "Simran"     // static values for testing purposes only

            // values from request body
            name : req.body.name ,
            password: securePassword,
            email : req.body.email ,
            location : req.body.location
        })

        .then(res.json({success : true}));
    }

    catch (error){
        console.log(error);
        res.json({success : false});
    }
})

module.exports = router;