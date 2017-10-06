'use strict';
module.exports = function(sequelize, DataTypes) {
  var Videos = sequelize.define('Videos', {
    videoURL: DataTypes.STRING,
    dominateHand: DataTypes.STRING,
    nonDominateHand: DataTypes.STRING,
    orientation: DataTypes.STRING,
    location: DataTypes.STRING,
    movement: DataTypes.STRING,
    expression: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Videos;
};