const seedGame2s = require('./game2-seeds');
const seedTournament2s = require('./tournament2-seeds');
const seedPlayer2s = require('./player2-seeds');
const seedTournament2Player2 = require('./tournament2-player2-seeds');
const { Player, Tournament, Game} = require('../models');
const gameData = require('./gameData.json');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedGame2s();
  console.log('\n----- Game2s SEEDED -----\n');

  await seedTournament2s();
  console.log('\n----- Tournament2s SEEDED -----\n');

  await seedPlayer2s();
  console.log('\n----- Player2s SEEDED -----\n');

  await seedTournament2Player2();
  console.log('\n----- Tournament2_Player2 SEEDED -----\n');

  await Game.bulkCreate(gameData,{
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();


