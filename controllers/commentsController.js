const router = require('express').Router();
const Comments = require('../db').import('../models/comments');
const validateSession = require('../middleware/validateSession')

router.get('/:mainPostId', function(req, res){
  res.send('gets all comments for a post');
})

router.put('/edit/:id', function(req, res){
  res.send('edits a comment by id ')
})

router.post('/create', validateSession, function(req, res){
  Comments.create({
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "comment posted!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/delete/:id', function(req,res){
  res.send('deletes a comment ')
})

module.exports = router;