const { Tournament2Player2 } = require('../models');

const Tournament2Player2Data = [
  {
    tournament2_id: 1,
    player2_id: 1,
  },
  {
    tournament2_id: 1,
    player2_id: 2,
  },
  {
    tournament2_id: 1,
    player2_id: 3,
  },
  {
    tournament2_id: 2,
    player2_id: 1,
  },
  {
    tournament2_id: 2,
    player2_id: 2,
  },
  {
    tournament2_id: 3,
    player2_id: 1,
  },
];

const seedTournament2Player2 = () => Tournament2Player2.bulkCreate(Tournament2Player2Data);

module.exports = seedTournament2Player2;
