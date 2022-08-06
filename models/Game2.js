const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Game2 extends Model {}

Game2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    game2_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    cover_art: {
      type: DataTypes.STRING,
    },
    game_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game2',
  }
);

module.exports = Game2;