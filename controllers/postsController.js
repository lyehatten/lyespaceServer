const router = require('express').Router();
const Posts = require('../db').import('../models/posts');
const validateSession = require('../middleware/validateSession')


router.post('/newPost', validateSession, function(req, res){
  Posts.create({
    post: req.body.post,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "Post made!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.put('/edit/:id', function(req, res){
  res.send('edits a post on the board');
})

router.delete('/delete/:id', function(req, res){
  res.send('delete post by id')
})

module.exports = router;