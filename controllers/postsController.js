const router = require('express').Router();
const Posts = require('../db').import('../models/posts');
const Comments = require('../db').import('../models/comments');
const validateSession = require('../middleware/validateSession');
const validateBandmate = require('../middleware/validateBandmate');


router.post('/newPost', validateSession, function(req, res){
  Posts.create({
    post: req.body.post,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "Post made!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.put('/edit/:id', validateSession, function(req, res){
  Posts.update(
    {post: req.body.post},
    {where: {id: req.params.id, userId: req.user.id}})
  .then(() => res.status(200).json({message: "Post Updated!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/delete/:id', validateSession, function(req, res){
  Comments.destroy(
    {where: {postId: req.params.id}}
  )
  Posts.destroy(
    {where: {id: req.params.id, userId: req.user.id}})
  .then(() => res.status(200).json({message: "Post deleted!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.put('/adminRemove/:id', validateBandmate, function(req, res){
  Comments.update(
    {comment: "Post has been removed by Admin."},
    {where: {postId: req.params.id}}
  )
  Posts.update(
    {post: "Post has been removed by Admin."},
    {where: {id: req.params.id}})
  .then(() => res.status(200).json({message: "Post deleted!"}))
  .catch((err) => res.status(500).json({ error: err }));
})


module.exports = router;