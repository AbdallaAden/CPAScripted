const mongoose = require("mongoose");
const { Schema } = mongoose;

//Post Schema
const postSchema = new Schema({
    //postId: {type: Number,required: true,unique: true,autoIncrement: true},
    userId: {type: String,ref: 'User',required: true},
    //courseId: {type: Number,ref: 'Course',required: true},
    title: {type: String,required: true,max: 25},
    content: {type: String,required: true,max: 150},
    likes: {type: Number},
    created: {type: Date,default: Date.now()}
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;