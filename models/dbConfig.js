var config = require('../config.example').db;
var Sequelize = require('sequelize');

// create sequelize instance

var sequelize = new Sequelize(config.name, config.username, config.password, {
    // disable logging; default: console.log
    // logging: false
  });
// IMPORT TABLES
var models = {
  'User': 'user.js',
  'Photo': 'photo.js',
  'Comment': 'comment.js' 
};

for (var k in models) {
  module.exports[k] = sequelize.import(__dirname + '/' + models[k]);
}

// ADD RELATIONSHIPS
(function(m) {
  // Photo m:1 User
  m.Photo.belongsTo(m.User, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'cascade'
  });
  m.User.hasMany(m.Photo);

  // Comment m:1 User
  m.Comment.belongsTo(m.User, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'cascade'
  });
  m.User.hasMany(m.Comment);
  
  // Comment m:1 Photo
  m.Comment.belongsTo(m.Photo, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'cascade'
  });
  m.Photo.hasMany(m.Comment);

  // LIKES Photos M:M Users  
  m.Photo.belongsToMany(m.User, {through: 'Like'});
  m.User.belongsToMany(m.Photo, {through: 'Like'});
  module.exports['Like'] = sequelize.models.Like;

})(module.exports);

module.exports.sequelize = sequelize;