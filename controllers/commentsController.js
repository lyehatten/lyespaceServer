const router = require('express').Router();

router.get('/:mainPostId', function(req, res){
  res.send('gets all comments for a post');
})

router.put('/edit/:id', function(req, res){
  res.send('edits a comment by id ')
})

router.post('/create', function(req, res){
  res.send('posts a comment to a post')
})

router.delete('/delete/:id', function(req,res){
  res.send('deletes a comment ')
})

module.exports = router;