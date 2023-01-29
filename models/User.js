const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require('./Post')

// User schema
const userSchema = new Schema({
      //userId: {type: Number,required: true,unique: true,autoIncrement: true},
      //_id: Schema.Types.ObjectId,
      firstName: {type: String,/*required: true,*/max: 20},
      lastName: {type: String,required: true,max: 20},
      password: {type: String,required: true,max: 20},
      email: {type: String,required: true,max: 30},
      posts: [{type: Schema.Types.ObjectId,ref: 'Post'}]
      /*role: {type: String,required: true,max: 10}*/      
      /*semesterId: {type: Number,ref: 'Semester',required: true},*/
      /*courseId: {type: Number,ref: 'Course',required: true},*/
});

const User = mongoose.model('User', userSchema);
module.exports = User;