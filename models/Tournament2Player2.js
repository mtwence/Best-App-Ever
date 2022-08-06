const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Tournament2Player2 extends Model {}

Tournament2Player2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tournament2_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "tournament2",
        key: "id",
      },
    },
    player2_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "player2",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tournament2_player2',
  }
);

module.exports = Tournament2Player2;