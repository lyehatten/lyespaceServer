module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('comments', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  })
  return Comments;
}