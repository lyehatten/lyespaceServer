module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('posts', {
    post: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  })
  return Posts;
}