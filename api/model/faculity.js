// create Teacher schema 

const mongoose=require('mongoose');

const faculitySchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    gender:String
    // employeeid:String
})

module.exports=mongoose.model('faculity',faculitySchema);