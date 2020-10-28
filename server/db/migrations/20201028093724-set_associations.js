"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("issues", "authorid", {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("issues", "milestoneid", {
      type: Sequelize.INTEGER,
      references: { model: "milestones", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("comments", "userid", {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("comments", "issueid", {
      type: Sequelize.INTEGER,
      references: { model: "issues", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("assignees", "userid", {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("assignees", "issueid", {
      type: Sequelize.INTEGER,
      references: { model: "issues", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("label_has_issues", "issueid", {
      type: Sequelize.INTEGER,
      references: { model: "issues", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("label_has_issues", "labelid", {
      type: Sequelize.INTEGER,
      references: { model: "labels", key: "id" },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
