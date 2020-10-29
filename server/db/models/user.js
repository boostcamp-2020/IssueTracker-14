"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.issue, {
        foreignKey: { name: "authorid", allowNull: false },
        sourceKey: "id",
      });
      this.hasMany(models.comment, {
        foreignKey: { name: "userid", allowNull: false },
        sourceKey: "id",
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      provider: {
        type: DataTypes.ENUM,
        values: ["local", "github", "apple"],
      },
      imageurl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
