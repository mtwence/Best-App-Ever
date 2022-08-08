const { TournamentPlayer} = require('../models');

const TournamentPlayerData = [
  {
    tournament_id: 1,
    player_id: 1,
  },
  {
    tournament_id: 1,
    player_id: 2,
  },
  {
    tournament_id: 1,
    player_id: 3,
  },
  {
    tournament_id: 2,
    player_id: 1,
  },
  {
    tournament_id: 2,
    player_id: 2,
  },
  {
    tournament_id: 3,
    player_id: 1,
  },
];

const seedTournamentPlayer = () => TournamentPlayer.bulkCreate(TournamentPlayerData);

module.exports = seedTournamentPlayer;
