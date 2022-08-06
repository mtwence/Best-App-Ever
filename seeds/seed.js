const sequelize = require('../config/connection');
const { Player, Tournament, Game, Game2, Player2 } = require('../models');

const playerData = require('./playerData.json');
const tournamentData = require('./tournamentData.json');
const gameData = require('./gameData.json');
const game2Data = require('./game2Data.json');
const player2Data = require('./player2Data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const players = await Player.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });


  await Game.bulkCreate(gameData,{
    individualHooks: true,
    returning: true,
  });


  for (const tournament of tournamentData) {
    await Tournament.create({
      ...tournament,
      player_id: players[Math.floor(Math.random() * players.length)].id,
    });
  }

  const player2s = await Player2.bulkCreate(player2Data, {
    individualHooks: true,
    returning: true,
  });

  for (const game2 of game2Data) {
    await Game2.create({
      ...game2,
      player2_id: player2s[Math.floor(Math.random() * player2s.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
