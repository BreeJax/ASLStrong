'use strict';
module.exports = function(sequelize, DataTypes) {
  var CategoriesAndWords = sequelize.define('CategoriesAndWords', {
    videoId: DataTypes.INTEGER,
    categories: DataTypes.ARRAY,
    words: DataTypes.ARRAY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CategoriesAndWords;
};