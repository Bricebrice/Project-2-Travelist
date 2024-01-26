const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");
const Country = require("../models/Country.model");
const Day = require("../models/Day.model");

const fileUploader = require("../config/cloudinary.config");

//GET route to view posts in explore page
router.get("/explore/posts", (req, res) => {
  Post.find()
    .populate("createdBy")
    .then((postsFromDB) => {
      res.render("posts/post-list", {
        post: postsFromDB,
        userInSession: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

//GET route to display form to create post
router.get("/explore/posts/create", isLoggedIn, (req, res) => {
  Country.find()
    .then((countriesFromDB) => {
      // console.log("countriesFromDB are: ", countriesFromDB);
      res.render("posts/post-create", {
        countries: countriesFromDB,
        userInSession: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

//POST route to submit and save form to create post
router.post(
  "/explore/posts/create",
  isLoggedIn,
  fileUploader.single("image"),
  (req, res) => {
    const {
      title,
      image,
      location,
      description,
      duration,
      distance,
      typeOfTrip,
      dayTitle,
      dayLocation,
      dayDescription,
    } = req.body;

    Post.create({
      title,
      image: req.file.path,
      location,
      description,
      duration,
      distance,
      typeOfTrip,
      createdBy: req.session.currentUser,
    }).then((newPostFromDB) => {
      console.log("newly created post", newPostFromDB);
      console.log(dayTitle, dayLocation, dayDescription);
      Day.create({
        title: dayTitle,
        location: dayLocation,
        description: dayDescription,
      }).then((dayCreated) => {
        const postId = newPostFromDB._id;
        Post.findByIdAndUpdate(
          postId,
          { $push: { itinerary: dayCreated._id } },
          { new: true }
        ).then(() => {
          res.redirect("/explore/posts");
        });
      });
    });
  }
);

// GET route for editing post
router.get("/explore/posts/:postId/edit", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((postToEdit) => {
      Country.find().then((countries) => {
        res.render("posts/post-edit", {
          post: postToEdit,
          countries,
          userInSession: req.session.currentUser,
        });
      });
    })
    .catch((err) => next(err));
});

// POST route for editing post
router.post(
  "/explore/posts/:postId/edit",
  isLoggedIn,
  fileUploader.single("postImage"),
  (req, res, next) => {
    const { postId } = req.params;
    const {
      title,
      existingImage,
      location,
      description,
      duration,
      distance,
      typeOfTrip,
    } = req.body;

    let postImage;
    if (req.file) {
      postImage = req.file.path;
    } else {
      postImage = existingImage;
    }

    console.log("req.body: ", req.body);
    Post.findByIdAndUpdate(
      postId,
      {
        title,
        image: postImage,
        location,
        description,
        duration,
        distance,
        typeOfTrip,
      },
      { new: true }
    )

      .then((updatedPost) => {
        console.log("post updated", updatedPost);
        post = updatedPost;
        res.redirect(`/explore/posts/${updatedPost._id}`);
      })
      .catch((err) => next(err));
  }
);

// GET route for viewing specific post
router.get("/explore/posts/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .populate("itinerary")
    .then((postFromDB) => {
      console.log("post from db", postFromDB);
      res.render("posts/post-view", {
        post: postFromDB,
        userInSession: req.session.currentUser,
      });
    });
});

//POST route to delete post
router.post("/explore/posts/:postId/delete", isLoggedIn, (req, res) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId).then(() => res.redirect("/explore/posts"));
});

module.exports = router;
