const mongoose = require("mongoose");
const { Schema } = mongoose;

//Message Schema
const MessageSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId,ref: 'User',required:true},    
    content: {type: String,required: true,max: 150},    
},
    {timestamps:true}
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;