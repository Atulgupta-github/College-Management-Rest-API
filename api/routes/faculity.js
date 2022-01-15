const express=require('express');
const router =express.Router();
const Faculity=require('../model/faculity');
const mongoose=require('mongoose');
const faculity = require('../model/faculity');
const checkAuth=require('../middleware/check-auth');



router.get('/',checkAuth,(req,res,next)=>{
    Faculity.find()
    .then(result=>{
        res.status(200).json({
            faculityData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
})

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Faculity.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            faculityData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    }) 
})
router.post('/',(req,res,next)=>{
    const faculity =new Faculity({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
        // employeeid:req.body.employeeid
    })
// if code is save successfully
    faculity.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newFaculity:result
        })
    })
//  if error occcure   
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

// delete request //

router.delete('/:id',(req,res,next)=>{
    Faculity.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'faculity data deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


// put request //

router.put('/:id',(req,res,next)=>{
    // console.log(req.params.id);
        Faculity.findOneAndUpdate({_id:req.params.id},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                gender:req.body.gender
            }
        })
        .then(result=>{
            res.status(200).json({
                Updated_faculitydata:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})










module.exports=router;