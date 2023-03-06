const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config({ path: 'config/keys.env' });
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const registerController = require('./controllers/registerController')
const loginController = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')




const app = express();
app.use(express.json())
app.use(cors()) 
app.use("/users",userController)
app.use("/posts",postController)
app.use("/comments",commentController)
app.use("/register",registerController)
app.use("/login",loginController)
app.use("/logout",logoutController)


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