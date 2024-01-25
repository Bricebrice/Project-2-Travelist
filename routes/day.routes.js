const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");
const Day = require("../models/Day.model");
const fileUploader = require("../config/cloudinary.config");

// GET route for editing day
router.get(
  "/explore/posts/:postId/itinerary/:dayId/edit",
  isLoggedIn,
  (req, res, next) => {
    console.log("req.params: ", req.params);

    const { postId, dayId } = req.params;
    Post.findById(postId)
      .populate("itinerary")
      .then((postToEdit) => {
        Day.findById(dayId).then((day) => {
          console.log(postToEdit, day);
          res.render("days/day-edit", { post: postToEdit, day, userInSession:req.session.currentUser })
        });
      })
      .catch((err) => next(err));
  }
);

// POST route for editing day
router.post(
  "/explore/posts/:postId/itinerary/:dayId/edit",
  isLoggedIn,
  fileUploader.single("dayImage"),
  (req, res, next) => {
    const { postId, dayId } = req.params;
    const { title, existingImage, location, description } = req.body;

    let dayImage;
    if (req.file) {
      dayImage = req.file.path;
    } else {
      dayImage = existingImage;
    }

    Day.findByIdAndUpdate(
      dayId,
      {
        title,
        image: dayImage,
        location,
        description,
      },
      { new: true }
    ).then((updatedDay) => {
      console.log("day updated", updatedDay);
      day = updatedDay;
      res.redirect(`/explore/posts/${postId}`);
    });

    // console.log("AQUI req.body: ", req.body, postId, dayId);
  }
);
module.exports = router;
