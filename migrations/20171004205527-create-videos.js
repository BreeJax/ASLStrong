'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoURL: {
        type: Sequelize.STRING
      },
      dominateHand: {
        type: Sequelize.STRING
      },
      nonDominateHand: {
        type: Sequelize.STRING
      },
      orientation: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      movement: {
        type: Sequelize.STRING
      },
      expression: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Videos');
  }
};