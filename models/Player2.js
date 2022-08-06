const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class Player2 extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Player2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    player2_name: {
      type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        }
    }
  },
  {
    hooks: {
        beforeCreate: async (newPlayerData) => {
            newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
            return newPlayerData;
        },
        // beforeUpdate: async (updatedPlayerData) => {
        //     updatedPlayerData.password = await bcrypt.hash(updatedPlayerData.password, 10);
        //     return updatedPlayerData;
        // }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'player2',
  }
);

module.exports = Player2;