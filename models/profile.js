module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    stageName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    instruments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bandcamp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bandcampExamples: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    spotify: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spotifyExamples: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true
    },
    youtubeExamples: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    soundcloud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    soundcloudExapmles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  })
  return Profile;
}