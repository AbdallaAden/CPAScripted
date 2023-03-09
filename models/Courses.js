const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
    semesterId: {type: Number,required: true},
    code: {type: String,required: true,maxlength: 10},
    name: {type: String,required: true,maxlength: 64},
    postId: [{type: Schema.Types.ObjectId,ref: 'Post'}],
    students:[{type: Schema.Types.ObjectId,ref: 'User'}]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;