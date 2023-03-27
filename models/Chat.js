const mongoose = require("mongoose");
const { Schema } = mongoose;

//Chat Schema
const ChatSchema = new Schema({
    user_id: [{type: Schema.Types.ObjectId,ref: 'User',required:true}],    
},
    {timestamps:true}
);

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;