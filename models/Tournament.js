// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Tournament2 model (table) by extending off Sequelize's Model class
class Tournament extends Model {}

// set up fields and rules for Tournament2 model
Tournament.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tournament_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    game_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "game",
        key: "id",
      },
    },
    discord_link:{
      type: DataTypes.STRING,
    }
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