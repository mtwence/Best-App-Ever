const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Player extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Player.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
  // {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   username: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   email: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     unique: true,
  //     validate: {
  //       isEmail: true,
  //     },
  //   },
  //   password: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     validate: {
  //       len: [8],
  //     },
  //   },
  //   favoriteGames: {
  //     type: DataTypes.ARRAY(DataTypes.STRING),
  //     allowNull: true,
  //   },
  // },
  // {
  //   hooks: {
  //     beforeCreate: async (newPlayerData) => {
  //       newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
  //       return newPlayerData;
  //     },
  //     beforeUpdate: async (updatedPlayerData) => {
  //       updatedPlayerData.password = await bcrypt.hash(
  //         updatedPlayerData.password,
  //         10
  //       );
  //       return updatedPlayerData;
  //     },
  //   },
  //   sequelize,
  //   timestamps: false,
  //   freezeTableName: true,
  //   underscored: true,
  //   modelName: "Player",
  // }
);

module.exports = Player;
