const express = require("express");
const router = express.Router();
const passport = require("passport");

// Post model
const Post = require("../models/Post");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/posts", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() =>
      res.status(404).json({ nopostsfound: "Aucune offre de stage trouvée" })
    );
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() =>
      res.status(404).json({ nopostfound: "Aucune offre de stage avec cet ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!req.user.admin) {
          return res
            .status(401)
            .json({ notauthorized: "Utilisateur non autorisé" });
        }

        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(() =>
        res
          .status(404)
          .json({ postnotfound: "L'offre de stage n'a pas été trouvée" })
      );
  }
);

module.exports = router;
