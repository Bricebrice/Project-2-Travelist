const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');
const fileUploader = require("../config/cloudinary.config");

//GET route to view posts in explore page
router.get('/explore/posts', (req,res) => {
    Post.find()
    .then((postsFromDB) => {
        res.render('posts/post-list', {posts: postsFromDB})
    })
    .catch(err => console.log (err))

});

//GET route to display form to create post
router.get('/explore/posts/create', isLoggedIn, (req,res) => { res.render('posts/post-create')});

//POST route to submit and save form to create post
router.post('/explore/posts/create', isLoggedIn, fileUploader.single('day-images'), (req,res) => {
    const {name, location, duration, distance, typeOfTrip, activities} = req.body;

    Post.create(req.body)
    .then(newPostFromDB => res.redirect('/explore/posts'))


})

module.exports = router;