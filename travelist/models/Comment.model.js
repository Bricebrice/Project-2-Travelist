const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    author: {
        type: Schema.Type.ObjectId,
        ref: "User"
    },
    content: String,
    rate: {
        type: Number,
        min: 0,
        max: 5,
    },
    post:{
        type: Schema.Type.ObjectId,
        ref:"Post"
    }

}, {
    timestamp: true
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;