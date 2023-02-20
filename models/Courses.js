const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
    courseId: {type: Number, required: true,unique: true,autoIncrement: true},
    //semesterId: {type: Number,ref: 'Semester',required: true},
    name: {type: String,required: true,maxlength: 10},
    description: {type: String,required: true,maxlength: 64},
    postId: {type: Number,required: true,ref: 'Post'}
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;