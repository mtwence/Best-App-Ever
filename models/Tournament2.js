// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Tournament2 model (table) by extending off Sequelize's Model class
class Tournament2 extends Model {}

// set up fields and rules for Tournament2 model
Tournament2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tournament2_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game2_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: "game2",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tournament2',
  }
);

module.exports = Tournament2;