"use strict"
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("CategoriesAndWords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoId: {
        type: Sequelize.INTEGER
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      words: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("CategoriesAndWords")
  }
}
