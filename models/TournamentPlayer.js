const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class TournamentPlayer extends Model {}

TournamentPlayer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "tournament",
        key: "id",
      },
    },
    player_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "player",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tournament_player',
  }
);

module.exports = TournamentPlayer;