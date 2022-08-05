const sequelize = require('../config/connection');
const { Player, Tournament } = require('../models');

const playerData = require('./playerData.json');
const tournamentData = require('./tournamentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const players = await Player.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });

  for (const tournament of tournamentData) {
    await Tournament.create({
      ...tournament,
      player_id: players[Math.floor(Math.random() * players.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
