const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');
const fileUploader = require("../config/cloudinary.config");

//GET route to view posts in explore page
router.get('/explore/posts', (req,res) => {
    Post.find()
    .then((postsFromDB) => {
        res.render('posts/post-list', {post: postsFromDB})
    })
    .catch(err => console.log (err))

});

//GET route to display form to create post
router.get('/explore/posts/create', isLoggedIn, (req,res) => { res.render('posts/post-create')});

//POST route to submit and save form to create post
router.post('/explore/posts/create', isLoggedIn, fileUploader.single('itinerary[0].day.images'), (req,res) => {
    const {title, location, duration, distance, typeOfTrip, itinerary} = req.body;

    Post.create({title,location,duration,distance,typeOfTrip,itinerary, createdBy: req.session.currentUser})
    .then(newPostFromDB => res.redirect('/explore/posts'))
})

//GET route for editing post
router.get('/explore/posts/:postId/edit', isLoggedIn, (req,res,next) => {
    const {postId} =req.params;
    Post.findById(postId)
    .then((postToEdit) => {
        res.render('posts/post-edit')
    })
    .catch((err) => next(err))
})

//POST route for editing post
router.post('/explore/posts/:postId/edit', isLoggedIn, (req,res,next) => {
    const {postId} = req.params;
    const {title, location, duration, distance, typeOfTrip, itinerary} = req.body;
    Post.findByIdAndUpdate(postId, {title, location, duration, distance, typeOfTrip, itinerary}, {new:true})
    .then((updatedPost)=>{
        console.log('post updated', updatedPost)
        res.redirect('/explore/posts')
    })
    .catch((err)=> next(err))
})

//GET route for viewing specific post
router.get('/explore/posts/:postId', (req,res) => {
    const {postId} = req.params;
    Post.findById(postId)
    .then((postFromDB) =>{
        res.render('posts/post-view', {post: postFromDB})
    })
})

//POST route to delete post
router.post('/explore/posts/:postId/delete', (req,res) => {
    const {postId} =req.params;
    Post.findByIdAndDelete(postId)
    .then(()=>res.redirect('/'))
})

module.exports = router;