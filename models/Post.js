const mongoose = require("mongoose");
const { Schema } = mongoose;

//Post Schema
const postSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    user_id: {type: Schema.Types.ObjectId,ref: 'User',required:true},
    course_id: {type: Number,ref: 'Course',required: true},
    title: {type: String,required: true,max: 25},
    content: {type: String,required: true,max: 150},
    likes: {type: Number, default:0},
    created: {type: Date,default: Date.now()},
    comments:[{type : Schema.Types.ObjectId, ref: 'Comment'}]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;