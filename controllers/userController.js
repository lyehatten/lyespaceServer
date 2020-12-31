const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


router.get('/userInfo/:id', function(req, res){
  res.send('info get route lol');
})

router.post('/register', function(req, res){
  User.create ({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password,13)
})
  .then (
      function createSuccess(user) {  
        let token = jwt.sign({id: user.id}, {userType: user.userType}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});   
          res.json ({
              user: user,
          message: 'User successfully created!',
          sessionToken: token     
        });
      }
  )
  .catch(err => res.status(500).json({error: err}))
})

router.post('/login', function(req, res){
  res.send('login route yeet')
})

router.delete('/remove/:id', function(req, res){
  res.send('remove user')
})

router.put('/role/:id', function(req, res){
  res.send('change rold route');
});

router.put('/update/:id', function(req, res){
  res.send('update user profile ')
})


module.exports = router;