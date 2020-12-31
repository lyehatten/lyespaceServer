const router = require('express').Router();

router.post('/create', function(req, res){
  res.send('this is create profile route ')
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