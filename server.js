const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/keys.env' });
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

const app = express();
app.use(express.json())
app.use("/users",userController)
app.use("/posts",postController)


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