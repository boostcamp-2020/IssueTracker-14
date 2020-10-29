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
    }
  }
  issue.init(
    {
      title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["open", "closed"],
      },
    },
    {
      sequelize,
      modelName: "issue",
    }
  );
  return issue;
};
