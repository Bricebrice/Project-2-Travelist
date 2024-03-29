const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// GET route to edit profile
router.get("/userProfile/:userId/edit", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((userToEdit) => {
      console.log("userToEdit:", userToEdit);
      res.render("users/user-edit", {
        userInSession: userToEdit,
      });
    })
    .catch((err) => next(err));
});

// POST route to edit profile with form
router.post(
  "/userProfile/:userId/edit",
  fileUploader.single("profileImage"),
  (req, res, next) => {
    const { firstName, lastName, username, existingImage } = req.body;
    const { userId } = req.params;

    let profileImage;
    if (req.file) {
      profileImage = req.file.path;
    } else {
      profileImage = existingImage;
    }
    User.findByIdAndUpdate(
      userId,
      { firstName, lastName, username, profileImage },
      { new: true }
    ).then((updatedUser) => {
      req.session.currentUser = updatedUser;
      console.log(
        "req.session.currentUser = updatedUser is: ",
        (req.session.currentUser = updatedUser)
      );
      res.redirect("/userProfile");
    });
  }
);

// //POST route to delete user
// router.post("/userProfile/:userId/delete", (req, res, next) => {
//     const {userId}=req.params;
//     req.session.destroy((err) => {
//       if (err) next(err);
//       // TO REMOVE - no aqui pero la idea es user.findbyIdandDelete y luego redirect
//       User.findByIdAndDelete(userId)
//       .then(()=> res.redirect("/"))
//     });
// });
module.exports = router;
