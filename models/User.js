module.exports = function(sequelize, dataTypes) {
  return sequelize.define('User', {
    username: {
      type: dataTypes.STRING,
      allowNull: false
    },    
    displayname: {
      type: dataTypes.STRING,
      allowNull: false
    }
  });
};