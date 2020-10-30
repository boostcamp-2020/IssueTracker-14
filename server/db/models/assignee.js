"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assignee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: { name: "userid", allowNull: false },
        sourceKey: models.user.id,
      });

      this.belongsTo(models.issue, {
        foreignKey: { name: "userid", allowNull: false },
        sourceKey: models.issue.id,
      });
    }
  }
  assignee.init(
    {},
    {
      sequelize,
      modelName: "assignee",
    }
  );
  return assignee;
};
