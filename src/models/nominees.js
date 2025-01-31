const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("Nominees", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    isWinner: { type: DataTypes.BOOLEAN, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
  });
};
