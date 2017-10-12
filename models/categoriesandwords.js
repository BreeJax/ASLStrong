"use strict"
module.exports = function(sequelize, DataTypes) {
  var CategoriesAndWords = sequelize.define(
    "CategoriesAndWords",
    {
      videoId: DataTypes.INTEGER,
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: "[]"
      },
      words: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: "[]"
      }
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
