const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require('./Post')
const bcrypt = require('bcrypt');
const { object, bool, boolean } = require("@hapi/joi");

// User schema
const userSchema = new Schema({
      
      username: {type: String,required: true,max: 20},
      //lastName: {type: String,required: true,max: 20},
      password: {type: String,required: true,max: 20},
      email: {type: String,required: true,max: 30},
      posts: [{type: Schema.Types.ObjectId,ref: 'Post'}],
      courses: [{type: Schema.Types.ObjectId,ref: 'Course'}],
      tokens: [{type : Object}],
      confirmed:{type : Boolean, default: false},
      followers:[{type: Schema.Types.ObjectId,ref: 'User'}],
      followings:[{type: Schema.Types.ObjectId,ref: 'User'}]
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

userSchema.pre('save', async function(next) {

})

const User = mongoose.model('User', userSchema);
module.exports = User;