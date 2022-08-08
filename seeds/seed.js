const seedGames = require('./game-seeds');
const seedTournaments = require('./tournament-seeds');
const seedPlayers = require('./player-seeds');
const seedTournamentPlayer = require('./tournamentPlayer-seeds');
const { Player, Tournament, Game} = require('../models');
// const gameData = require('./gameData.json');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedGames();
  console.log('\n----- Games SEEDED -----\n');

  await seedTournaments();
  console.log('\n----- Tournaments SEEDED -----\n');

  await seedPlayers();
  console.log('\n----- Players SEEDED -----\n');

  await seedTournamentPlayer();
  console.log('\n----- Tournament_Player SEEDED -----\n');

  // await Game.bulkCreate(gameData,{
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedAll();


