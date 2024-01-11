const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  firstName: {
        type: String,
        trim:true,
    },
  lastName:{
        type:String,
        trim:true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required:true,
  },
  profileImage:{
    type:String,
  },
  savedPosts: [{
    type: Schema.Types.OjectId, 
    ref: "Post"
  }],
  createdPosts:[{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  comments:[{
    type: Schema.Type.ObjectId,
    ref: "Comment"
  }],

}, {
    timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
