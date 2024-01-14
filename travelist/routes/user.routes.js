const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

// GET route to edit profile
router.get('/userProfile/edit', (req,res,next) =>{
    const {id} = req.params;
    User.findById(id)
    .then((userToEdit) => res.render('users/user-edit', {userInSession: req.session.currentUser}))
    .catch((err) => next(err))
});

//POST route to edit profile with form
router.post('/userProfile/edit', fileUploader.single('profileImage'), (req,res,next) => {
    const { firstName, lastName, username, email, password, existingImage} = req.body;
    const {id} = req.params

    let profileImage;
    if (req.file){
        profileImage = req.file.path
    }else {
        profileImage = existingImage
    } 
    User.findByIdAndUpdate(id, {firstName, lastName, username, email, password, profileImage}, {new:true})
    .then(() => {res.redirect('/userProfile')})
})

module.exports = router;