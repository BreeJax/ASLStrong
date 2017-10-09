"use strict"
module.exports = function(sequelize, DataTypes) {
  var CategoriesAndWords = sequelize.define(
    "CategoriesAndWords",
    {
      videoId: DataTypes.INTEGER,
      categories: DataTypes.ARRAY(DataTypes.STRING),
      words: DataTypes.ARRAY(DataTypes.STRING)
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  )
  return CategoriesAndWords
}
