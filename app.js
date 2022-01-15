const express= require('express');
const app=express();
const studentRoute=require('./api/routes/student');
const faculityRoute=require('./api/routes/faculity');
const userRoute=require('./api/routes/user');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


mongoose.connect('mongodb+srv://demonew1:demonew1@sbs.betea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database....')
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/faculity',faculityRoute);
app.use('/user',userRoute);




// Error handling

app.use((req,res,next)=>{
    res.status(404).json({
        error:'url not found'
    })
})

app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

module.exports=app;