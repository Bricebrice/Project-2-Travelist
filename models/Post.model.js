const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: String,
    image: {
      type:String,
      default: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    location: {
      type: String,
      required: true,
    },
    description: String,
    duration: Number,
    distance: Number,
    typeOfTrip: {
      type: [String],
      enum: [
        "Escape trip",
        "Spa trip",
        "Honeymoon",
        "Cultural Trip",
        "Road Trip",
      ],
    },
    itinerary: [{ type: Schema.Types.ObjectId, ref: "Day" }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    savedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
