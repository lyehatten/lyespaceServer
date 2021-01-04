const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgress',
  dialectOptions: {
    ssl: true
  }
});

sequelize.authenticate().then(
  function() {
    console.log('Connected to the lyespace Database!');
  },
  function(err){
    console.log(err);
  }
);

User = sequelize.import('./models/user');
Profile = sequelize.import('./models/profile');
Posts = sequelize.import('./models/posts');
Comments = sequelize.import('./models/comments');

User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Posts);
Posts.belongsTo(User);
User.hasMany(Comments);
Posts.hasMany(Comments);
Comments.belongsTo(User);
Comments.belongsTo(Posts);

module.exports = sequelize;