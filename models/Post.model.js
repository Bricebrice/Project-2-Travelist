const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  { name: String,
    location: {
      type: String,
      required: true,
    },
    duration: Number,
    distance: Number,
    typeOfTrip: {
      type: String,
      enum: ["Escape trip", "Spa trip", "Honeymoon", "Cultural Trip", "Road Trip"],
    },
   itinerary: [
      {
        day: {
          location: String,
          description: String,
          images: [String],
        },
      },
    ],
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