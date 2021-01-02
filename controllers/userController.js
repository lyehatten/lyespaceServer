const router = require('express').Router();
const User = require('../db').import('../models/user');
const Profile = require('../db').import('../models/profile');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const validateSession = require('../middleware/validateSession')
const validateBandmate = require('../middleware/validateBandmate')
const validateBigBoss = require('../middleware/validateBigBoss')

router.post('/register', function(req, res){
  User.create ({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,13),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userType: req.body.userType
})
  .then (
      function createSuccess(user) {  
        let token = jwt.sign({id: user.id, userType: user.userType}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});   
          res.json ({
              user: user,
          message: 'User successfully created!',
          sessionToken: token     
        });
      }
  )
  .catch(err => res.status(500).json({error: err}))
})

router.get('/userInfo/:id',  function(req, res){
  User.findOne({
    where: { id: req.params.id},
    include: ['profile']
})
.then(data => res.status(200).json(data))
.catch(err => res.status(500).json({ error: err }))
})

router.get('/findAll', (req, res) => {
  User.findAll({
    include: 'profile'
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ error: err }))
})

router.post('/login', function(req, res){
    User.findOne ({
        where: {
            email: req.body.email
        }
    })
        .then(function loginSuccess(user) {
            if (user) {
              bcrypt.compare(req.body.password,user.password,function(err,matches) {
                if (matches) {
                  let token = jwt.sign({id: user.id, userType: user.userType}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); 
                  res.status(200).json({
                   user: user,
                   message: 'User successfully logged in!',
                   sessionToken: token                            
                  })
                } else {
                   res.status(502).json({ error: 'Login failed.'});
                }
                })
            } else {
               res.status(500).json({ error: 'User does not exist.'})  
            }    
        })
        .catch(err => res.status(500).json({ error: err}))
});

router.delete('/removeAdmin/:id', validateBandmate, function(req, res){
  const query = { where: { id: req.params.id }};
    Profile.destroy({where: {userId: req.params.id}})
    User.destroy(query)
    .then(() => res.status(200).json({message: "user removed"}))
    .catch((err) => res.status(500).json({ error: err }));
})

router.delete('/removeSelf', validateSession, function(req, res){
  const query = { where: { id: req.user.id }};
    Profile.destroy({where: {userId: req.user.id}})
    User.destroy(query)
    .then(() => res.status(200).json({message: "your user profile removed"}))
    .catch((err) => res.status(500).json({ error: err }));
})

router.put('/role/:id', validateBigBoss, function(req, res){
  User.update(
    {userType: "bandmate"}, 
    {where: {id: req.params.id}})
    .then(() => res.status(200).json({message: "Changed role to bandmate!"}))
    .catch((err) => res.status(500).json({ error: err}));
});

router.put('/update', validateSession, function(req, res){
  User.update(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    {where: {id: req.user.id}}
  )
  .then(() => res.status(200).json({message: "updated info!"}))
  .catch((err) => res.status(500).json({ error: err}));
  
})


module.exports = router;