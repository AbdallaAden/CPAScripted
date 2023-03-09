const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require('./Post')
const bcrypt = require('bcrypt');
const { object } = require("@hapi/joi");

// User schema
const userSchema = new Schema({
      
      username: {type: String,required: true,max: 20},
      //lastName: {type: String,required: true,max: 20},
      password: {type: String,required: true,max: 20},
      email: {type: String,required: true,max: 30},
      posts: [{type: Schema.Types.ObjectId,ref: 'Post'}],
      courses: [{type: Schema.Types.ObjectId,ref: 'Course'}],
      tokens: [{type : Object}]
      /*role: {type: String,required: true,max: 10}*/      
      /*semesterId: {type: Number,ref: 'Semester',required: true},*/
      
      //friendsList: [(friendList)]
});

userSchema.pre('save',async function(next){
      try{
        const salt=await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(this.password,salt);
        this.password=hash;
        next();
      }catch(err){
        next(err)
      }
      })

const User = mongoose.model('User', userSchema);
module.exports = User;