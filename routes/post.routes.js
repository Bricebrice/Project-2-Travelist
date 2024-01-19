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
router.post('/explore/posts/create', isLoggedIn, fileUploader.single('image'), (req,res) => {
    const {title, image, location, description, duration, distance, typeOfTrip} = req.body;

    Post.create({title, image: req.file.path, location, description, duration, distance, typeOfTrip, createdBy: req.session.currentUser})
    .then(newPostFromDB =>{
        console.log('newly created post', newPostFromDB)
        res.redirect('/explore/posts')
    })
})

//GET route for editing post
router.get('/explore/posts/:postId/edit', isLoggedIn, (req,res,next) => {
    const {postId} =req.params;
    Post.findById(postId)
    .then((postToEdit) => {
        res.render('posts/post-edit', {post: postToEdit})
    })
    .catch((err) => next(err))
})

//POST route for editing post
router.post('/explore/posts/:postId/edit', isLoggedIn, fileUploader.single('postImage'), (req,res,next) => {
    const {postId} = req.params;
    const {title, existingImage, location, description, duration, distance, typeOfTrip} = req.body;

    let postImage;
    if (req.file) {
        postImage = req.file.path;
    } else {
        postImage = existingImage;
    }
    Post.findByIdAndUpdate(postId, {title, postImage, location, description, duration, distance, typeOfTrip}, {new:true})
    .then((updatedPost)=>{
        console.log('post updated', updatedPost)
        post = updatedPost;
        res.redirect(`/explore/posts/${updatedPost._id}`)
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
router.post('/explore/posts/:postId/delete', isLoggedIn, (req,res) => {
    const {postId} =req.params;
    Post.findByIdAndDelete(postId)
    .then(()=>res.redirect('/explore/posts'))
})

module.exports = router;