"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.issue, {
        foreignKey: { name: "milestoneid", allowNull: false },
        sourceKey: "id",
      });
    }
  }
  milestone.init(
    {
      title: DataTypes.STRING,
      duedate: DataTypes.DATE,
      status: { type: DataTypes.ENUM, values: ["open", "closed"] },
    },
    {
      sequelize,
      modelName: "milestone",
    }
  );
  return milestone;
};
