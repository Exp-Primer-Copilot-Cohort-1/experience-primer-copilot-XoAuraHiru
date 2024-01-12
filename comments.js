// Create web server
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var Post = mongoose.model("Post");
var User = mongoose.model("User");

// Get all comments
router.get("/", function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// Post comment
router.post("/", function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Preload comment objects on routes with ':comment'
router.param("comment", function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error("can't find comment"));
    }
    req.comment = comment;
    return next();
  });
});

// Get a comment
router.get("/:comment", function(req, res) {
  res.json(req.comment);
});

// Delete a comment
router.delete("/:comment", function(req, res, next) {
  Comment.remove(
    {
      _id: req.comment._id
    },
    function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    }
  );
});

// Upvote a comment
router.put("/:comment/upvote", function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Downvote a comment
router.put("/:comment/downvote", function(req, res, next) {
  req.comment.downvote(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Path: comments.js
// Create web server
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var Post = mongoose.model("Post");
var User = mongoose.model("User");

// Get all comments
router.get("/", function(req, res, next) { // Get all comments
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
} );
