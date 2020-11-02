"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("milestones", "description", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
