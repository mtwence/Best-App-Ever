const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tournament extends Model {}

Tournament.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    player_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'player',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tournament',
  }
);

module.exports = Tournament;
