const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class GameTournament extends Model {}

GameTournament.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game2_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "game2",
        key: "id",
      },
    },
    tournament2_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "tournament2",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game_tournament',
  }
);

module.exports = GameTournament;