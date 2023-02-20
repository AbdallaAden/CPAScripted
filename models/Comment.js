const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User',required:true},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post',required:true},
    date: {type: Date, default: Date.now},
    thumbs:{type: Number}
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
