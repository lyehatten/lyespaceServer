const router = require('express').Router();
const Profile = require('../db').import('../models/profile');
const validateSession = require('../middleware/validateSession')
const validateBandmate = require('../middleware/validateBandmate');


router.post('/create', validateSession, function(req, res){
  Profile.create({
    stageName: req.body.stageName,
    bio: req.body.bio,
    genres: req.body.genres,
    instruments: req.body.instruments,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    facebook: req.body.facebook,
    bandcamp: req.body.bandcamp,
    spotify: req.body.spotify,
    youtube: req.body.youtube,
    soundcloud: req.body.soundcloud,
    examples: req.body.examples,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "user Profile created"}))
    .catch((err) => res.status(500).json({ error: err }));
})


router.put('/update', validateSession, function(req, res){
  Profile.update({
    stageName: req.body.stageName,
    bio: req.body.bio,
    genres: req.body.genres,
    instruments: req.body.instruments,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    facebook: req.body.facebook,
    bandcamp: req.body.bandcamp,
    spotify: req.body.spotify,
    youtube: req.body.youtube,
    soundcloud: req.body.soundcloud,
    examples: req.body.examples
  },
  {where: {userId: req.user.id}})
  .then(() => res.status(200).json({message: "user Profile updated"}))
    .catch((err) => res.status(500).json({ error: err }));
})

router.put('/adminRemove/:id', validateBandmate, function(req, res){
  Profile.update({
    bio: "Profile has been removed by Admin.",
    stageName: null,
    genres: null,
    instruments: null,
    twitter: null,
    instagram: null,
    facebook: null,
    bandcamp: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    examples: null
  },
  {where: {userId: req.params.id}})
  .then(() => res.status(200).json({message: "User Profile removed"}))
    .catch((err) => res.status(500).json({ error: err }));
})

module.exports = router;