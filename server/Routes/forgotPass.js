const express = require("express")
const router = express.Router()
require("../db.js")
const UserModel = require("../models/Users.js")
const bcrypt = require("bcrypt"); 
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');

router.post("/otp",(req,res)=>{
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iit2022031@iiitl.ac.in',
          pass: 'iiitl@1264'
        }
      });
      
      var mailOptions = {
        from: 'iit2022031@gmail.com',
        to: req.body.email,
        subject: 'OTP to reset your password',
        text: otp
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    res.send(otp)
})

router.put("/chPass",async (req,res)=>{
    const { email,newPass } = req.body
    const user = await UserModel.findOne({email})
    const hashedNewPass = await bcrypt.hash(newPass, 10);
    user.password = hashedNewPass
    await user.save()
    res.json(user)
    console.log(user)
})

module.exports = router