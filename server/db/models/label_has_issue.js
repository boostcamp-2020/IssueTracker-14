"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class label_has_issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.issue, {
        foreignKey: { name: "issueid", allowNull: false },
        sourceKey: models.issue.id,
      });

      this.belongsTo(models.label, {
        foreignKey: { name: "labelid", allowNull: false },
        sourceKey: models.label.id,
      });
    }
  }
  label_has_issue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "label_has_issue",
    }
  );
  return label_has_issue;
};
