const router = require('express').Router();
const Profile = require('../db').import('../models/profile');
const validateSession = require('../middleware/validateSession')


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
    bandcampExamples: req.body.bandcampExamples,
    spotify: req.body.spotify,
    spotifyExamples: req.body.spotifyExamples,
    youtube: req.body.youtube,
    youtubeExamples: req.body.youtubeExamples,
    soundcloud: req.body.soundcloud,
    soundcloudExamples: req.body.soundcloudExamples,
    userId: req.user.id
  })
  .then(() => res.status(200).json({message: "user Profile created"}))
    .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/remove/:id', function(req, res){
  res.send('remove user')
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
    bandcampExamples: req.body.bandcampExamples,
    spotify: req.body.spotify,
    spotifyExamples: req.body.spotifyExamples,
    youtube: req.body.youtube,
    youtubeExamples: req.body.youtubeExamples,
    soundcloud: req.body.soundcloud,
    soundcloudExamples: req.body.soundcloudExamples,
    userId: req.user.id
  },
  {where: {userId: req.user.id}})
  .then(() => res.status(200).json({message: "user Profile updated"}))
    .catch((err) => res.status(500).json({ error: err }));
})


module.exports = router;