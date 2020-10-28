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
    }
  }
  label_has_issue.init(
    {},
    {
      sequelize,
      modelName: "label_has_issue",
    }
  );
  return label_has_issue;
};
