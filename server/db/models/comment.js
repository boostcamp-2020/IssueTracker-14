"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
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

      this.belongsTo(models.user, {
        foreignKey: { name: "userid", allowNull: false },
        sourceKey: models.user.id,
      });
    }
  }
  comment.init(
    {
      content: DataTypes.STRING(191),
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
