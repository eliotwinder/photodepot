module.exports = function(sequelize, dataTypes) {
  return sequelize.define('Comment', {
    text: dataTypes.STRING,
  });
};