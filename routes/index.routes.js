const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    // Retrieve all posts from the db and populate the createdBy to retrieve the user
    const postsFromDB = await Post.find().populate("createdBy");

    // Only 3 posts
    const limitedPosts = postsFromDB.slice(0, 3);

    res.render("index", {
      post: limitedPosts,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
