"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bid.belongsTo(models.artwork, { foreignKey: "artworkId" });
    }
  }
  bid.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artworkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "bid",
    }
  );
  return bid;
};
