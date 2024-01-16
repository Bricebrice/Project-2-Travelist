const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
