// create Teacher schema 

const mongoose=require('mongoose');

const userSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    email:String,
    phone:Number,
    userType:String
    // employeeid:String
})

module.exports=mongoose.model('user',userSchema);