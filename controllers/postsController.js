const router = require('express').Router();

router.get('/:userPostID', function(req, res){
  res.send('get all the users posts');
})

router.post('/newPost', function(req, res){
  res.send('new post');
})

router.put('/edit/:id', function(req, res){
  res.send('edits a post on the board');
})

router.delete('/delete/:id', function(req, res){
  res.send('delete post by id')
})

module.exports = router;