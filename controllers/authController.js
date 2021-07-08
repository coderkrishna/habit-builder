const User = require('../models/userSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

//const sgMail = require("@sendgrid/mail");


const register = async (req, res, next) => {

    User.findOne({email : String(req.body.email).toLowerCase()})
     .then(user => {
         if(user) {
             res.json({
                 message: "This email is already registered",
                 success : false
             });
         } else {
                bcrypt.hash(req.body.password, 10).then((hashedPass) => {
                  
                 var generateRole = () => {
                     let roleid = 1; //user
                     if(req.body.name === process.env.ADMIN_NAME && req.body.email === process.env.ADMIN_EMAIL && req.body.company == process.env.ADMIN_COMPANY)
                     {
                         roleid = 99;   
                     }
                     return roleid;
                 }
 
 
                 //let verificationid = generateId();
 
                 let role = generateRole();
 
                 
                 let user = new User({
 
                    // customId: idRes,
                     name:  String(req.body.name).trim(),
                     email: String(req.body.email).toLowerCase(),
                     phone: req.body.phone,
                     password: hashedPass,
                     role :  req.body.role || role,
 
                 });
 
         
              user.save().then( async (user) => { 

                     res.json({
                         email : String(req.body.email).toLowerCase(),
                         message: "You are registered succesfully",
                         success : true
                     });
                   
                 }).catch(error => {
                     res.json({
                         message: "Something went wrong ",
                         success : false
                     });
                     next(error);
                 });
             })
         }
     });
 }
 
 


const login =  (req, res, next) => {

    var email = String(req.body.email).toLowerCase();
    var password = req.body.password;
    
    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password)
            .then((result) => {
                  if(result) {
                      var token = jwt.sign({
                        name : user.name,
                        email: user.email,
                        phone : user.phone

                }, process.env.JWT_KEY , {
                        expiresIn: '24h'
                    });
                
                    res.json({
                        message: "Login Successfully!",
                        token: token,
                        success : true
                    });
                 }else {
                    res.json({
                        message: "Password does not match !",
                        success : false
                    });
                }
            }).catch((err) => {
                    res.json({
                        error: err,
                    });
                    next(err)
            });

        }else {
            res.json({
                message: "No user found!",
                success : false
            });
        }
    });
}

module.exports = { register , login }