require('dotenv').config();
let express = require('express');
let app = express();


app.use(require('./middleware/headers'));
const validateSession = require('./middleware/validateSession')

let posts = require('./controllers/postsController');
let comments = require('./controllers/commentsController');
let user = require('./controllers/userController');
let profile = require('./controllers/profileController');
const sequelize = require('./db');


sequelize.sync();
//sequelize.sync({force: true})

app.use('/user', user);
app.use('/profile', profile);
app.use('/posts', posts);
app.use('/comments', comments)

app.listen(1234, function(){
  console.log('app is vibing on port 1234')
})