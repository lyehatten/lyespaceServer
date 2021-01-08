require('dotenv').config();
let express = require('express');
let app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(require('./middleware/headers'));


let posts = require('./controllers/postsController');
let comments = require('./controllers/commentsController');
let user = require('./controllers/userController');
let profile = require('./controllers/profileController');
const sequelize = require('./db');


sequelize.sync();
sequelize.sync({force: true})

app.use('/user', user);
app.use('/profile', profile);
app.use('/posts', posts);
app.use('/comments', comments)

app.listen(process.env.PORT, function(){
  console.log(`app is vibing on port ${process.env.PORT}`)
})