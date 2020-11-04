"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comment, {
        foreignKey: { name: "issueid", allowNull: false },
        sourceKey: "id",
      });

      this.hasMany(models.assignee, {
        foreignKey: { name: "issueid", allowNull: false },
        sourceKey: "id",
      });

      this.hasMany(models.label_has_issue, {
        foreignKey: { name: "issueid", allowNull: false },
        sourceKey: "id",
      });

      this.belongsTo(models.user, {
        foreignKey: { name: "authorid", allowNull: false },
        sourceKey: models.user.id,
      });

      this.belongsTo(models.milestone, {
        foreignKey: { name: "milestoneid", allowNull: true },
        sourceKey: models.milestone.id,
      });
    }
  }
  issue.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: ["open", "closed"],
        allowNull: false,
      },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "issue",
    }
  );
  return issue;
};
