const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    duration: Number,
    distance: Number,
    typeOfRoadtrip: {
      type: String,
      enum: ["Escape trip", "Spa trip", "Honeymoon", "Cultural"],
    },
    activities: {
      type: [String],
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
      type: Schema.Type.ObjectId,
      ref: "User",
      required: true,
    },
    savedBy: [
      {
        type: Schema.Types.OjectId,
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
