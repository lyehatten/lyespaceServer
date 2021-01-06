const router = require('express').Router();
const Comments = require('../db').import('../models/comments');
const validateBandmate = require('../middleware/validateBandmate');
const validateSession = require('../middleware/validateSession')


router.post('/create', validateSession, function(req, res){
  Comments.create({
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "comment posted!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.get('/allComments/:postId', function(req, res){
  Comments.findAll({
    where: {postId: req.params.postId},
    include: 'user'
  })
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(500).json({ error: err }));
})

router.put('/edit/:id', validateSession, function(req, res){
  Comments.update(
    {comment: req.body.comment},
    {where: {id: req.params.id, userId: req.user.id}}
  )
  .then(() => res.status(200).json({message: "comment edited!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/delete/:id', validateSession, function(req,res){
  Comments.destroy({
    where: {id: req.params.id, userId: req.user.id}
  })
  .then(() => res.status(200).json({message: "comment deleted!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

router.put('/adminRemove/:id', validateBandmate, function(req,res){
  Comments.update(
    {comment: "Admin has removed comment."},
    {where: {id: req.params.id}}
  )
  .then(() => res.status(200).json({message: "comment updated!"}))
  .catch((err) => res.status(500).json({ error: err }));
})

module.exports = router;