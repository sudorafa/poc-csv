const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Movies", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
  });
};
