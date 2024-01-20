const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema(
  {
    title: String,
    location: String,
    description: String,
    image: String,
  },
  {
    timestamp: true,
  }
);

const Day = mongoose.model("Comment", commentSchema);

module.exports = Day;
