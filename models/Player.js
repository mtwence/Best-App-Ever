const {Model, DataTypes} = require('sequelize');
 const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Player extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);

    }
 }

Player.init(
    {
        id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true
        },
        name: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: {isAlpha:true},
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
             beforeCreate: async (newUserData) => {
                 newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
             },
            // },
            //  beforeUpdate: async (updatedPlayerData) => {
            //     updatedPlayerData.password = await bcrypt.hash(updatedPlayerData.password, 10);
            //      return updatedPlayerData;
            //  }
         },
         sequelize,
         timestamps: false,
        freezeTableName: true,
         underscored: true,
         modelName: 'player',
    }

);

  module.exports = Player;

// var Sequelize = require('sequelize');
// var bcrypt = require('bcrypt');
	
// // create a sequelize instance with our local postgres database information.
// const sequelize = new Sequelize('letsPlay', 'root', 'password', {
// 	host:'localhost',
// 	port: 3003,
// 	dialect:'mysql',
// 	pool:{
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000
// 	}, 
// 	operatorsAliases: false
// });

// // setup User model and its fields.
// var player = sequelize.define('players', {
//     id: {
//         type: Sequelize.INTEGER,
//         unique: true,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
// 	username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }); 

// player.beforeCreate((user, options) => {
// 	const salt = bcrypt.genSaltSync();
// 	user.password = bcrypt.hashSync(player.password, salt);
// });
  
 
// // users.prototype.validPassword = function(password) {
// //         return bcrypt.compareSync(password, this.password);
// //       }; 

// // create all the defined tables in the specified database.
// sequelize.sync()
//     .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));

// // export User model for use in other files.
// module.exports = Player;
