const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');
const User=require('../model/user');
const bcrypt=require('bcrypt');
const user = require('../model/user');
const jwt=require('jsonwebtoken');


router.post('/signup',(req,res,next)=>{
   bcrypt.hash(req.body.password,10,(err,hash)=>{ //conver password data in hashcode//
       if(err){
           return res.status(500).json({
               error:err
           })
       }
       else{
           const user =new User({
            _id: new mongoose.Types.ObjectId,
            username:req.body.username,
            password:hash,//password  store in hash code in database
            email:req.body.username,
            phone:req.body.phone,
            userType:req.body.userType
           })

           user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    newUser:result
                })
            })
//  if error occcure   
            .catch(err=>{
                 console.log(err)
                res.status(500).json({
                  error:err
                })
            })
        }
   })
})

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                msg:'user does not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
            return res.status(400).json({
                msg:'incorrect password '
                })
            }
            if(result)
            {
            const token=jwt.sign({
                username:user[0].username,
                email:user[0].email,
                phone:user[0].phone,
                userType:user[0].userType
                
            },
            'This is dummy text',{
                expiresIn:"24h"
            })
            res.status(200).json({
                username:user[0].username,
                userType:user[0].userType,
                email:user[0].email,
                phone:user[0].phone,
                token:token

            })
        }

        }) // password match which store in db and user provide
        
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})



module.exports=router;
