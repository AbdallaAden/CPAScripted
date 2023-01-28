const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/keys.env' });

const userModel = require('./models/User')

const app = express();
app.use(express.json())

app.get('/users',(req,res) =>{
    userModel.find()
    .then(users =>{
        res.json({
            message : "List of all the users",
            data : users,
            totalUsers: users.length
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
        
    })
})

app.get('/users/:id',(req,res) =>{
    userModel.findById(req.params.id)
    .then(user =>{
        
      if(user){
        res.json({
            message : `User with id ${req.params.id}`,
            data : user
        })
      }
      else {
        res.status(404).json({
            message : `No user with id ${req.params.id}`
        })       
      }
    })
    .catch(err=>{
        res.status(404).json({
            message: err
        })
        
    })
})

app.put('/users/:id',(req,res) =>{
    userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(UpdatedUser =>{
        
      if(UpdatedUser){
        res.json({
            message : `User with id ${req.params.id} successfully updated`,
            data : UpdatedUser
        })
      }
      else {
        res.status(404).json({
            message : `No user with id ${req.params.id} found`
        })       
      }
    })
    .catch(err=>{
        res.status(404).json({
            message: err
        })
        
    })
})

app.post('/users',(req,res) =>{
    const user = new userModel(req.body)

    user.save()
    .then((newUser)=>{
        res.json({
            message : "The User was successfully created",
            data : newUser
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
        
    })
})

app.delete('/users/:id',(req,res) =>{
    userModel.findByIdAndRemove(req.params.id)
    .then(UpdatedUser =>{
        
      if(UpdatedUser){
        res.json({
            message : `User with id ${req.params.id} successfully deleted`,
            data : UpdatedUser
        })
      }
      else {
        res.status(404).json({
            message : `No user with id ${req.params.id} found`
        })       
      }
    })
    .catch(err=>{
        res.status(404).json({
            message: err
        })
        
    })
})

app.listen(process.env.PORT, ()=>{
    console.log("CPA Rest API running on: "+ process.env.PORT);
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_QUERY_STRING)
    .then(()=>{
        console.log(`Connected to MongoDb CPA Scripted`)
    })
    .catch(err=>{
        console.log(`Error ${err}`)
    })

})