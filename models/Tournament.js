const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
    needed_funding: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
  // {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   description: {
  //     type: DataTypes.STRING,
  //   },
  //   discordLink: {
  //     type: DataTypes.STRING,
  //     allowNull: true,
  //   },
  //   winner: {
  //     type: DataTypes.STRING,
  //     allowNull: true,
  //   },
  //   host_id: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: "player",
  //       key: "id",
  //     },
  //   },
  //   game_id: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: "game",
  //       key: "id",
  //     },
  //   },
  //   isItOver: {
  //     type: DataTypes.BOOLEAN,
  //     defaultValue: false,
  //   },
  //   date_created: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: DataTypes.NOW,
  //   },
  //   date_expired: {
  //     type: DataTypes.DATE,
  //   },
  //   prize_pool: {
  //       type: DataTypes.STRING,
  //   }
  // },
  // {
  //   sequelize,
  //   timestamps: false,
  //   freezeTableName: true,
  //   underscored: true,
  //   modelName: "Tournament",
  // }
);

module.exports = Tournament;
