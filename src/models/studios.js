const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Studios", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
};
