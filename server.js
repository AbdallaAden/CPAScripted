const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const multer= require('multer')
const path= require('path')
require('dotenv').config({ path: 'config/keys.env' });

const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const registerController = require('./controllers/registerController')
const loginController = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const courseController = require('./controllers/courseController')





const app = express();
app.use(express.json())
app.use(cors()) 
app.use("/users",userController)
app.use("/posts",postController)
app.use("/comments",commentController)
app.use("/register",registerController)
app.use("/login",loginController)
app.use("/logout",logoutController)
app.use("/courses",courseController)

app.use('/images/person', express.static(path.join(__dirname, '/public/images/person')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});


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