const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Post.find()
    .then((postsFromDB) => {
      res.render("index", {
        post: postsFromDB,
        userInSession: req.session.currentUser,
      });
    })
});

module.exports = router;
