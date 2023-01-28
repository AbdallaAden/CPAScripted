const express = require("express");
const mongoose = require('mongoose');

require('dotenv').config({ path: 'config/keys.env' });

const app = express();

app.get('/',(req,res) =>{

})

app.get('/:id',(req,res) =>{

})

app.put('/',(req,res) =>{

})

app.post('/',(req,res) =>{

})

app.delete('/',(req,res) =>{

})

app.listen(process.env.PORT, ()=>{
    console.log("CPA Rest API running on: "+ process.env.PORT);

    mongoose.connect(process.env.MONGODB_QUERY_STRING)
    .then(()=>{
        console.log(`Connected to MongoDb CPA Scripted`)
    })
    .catch(err=>{
        console.log(`Error ${err}`)
    })

})