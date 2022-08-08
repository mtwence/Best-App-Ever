const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    game_name: {
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
    modelName: 'game',
  }
);

module.exports = Game;