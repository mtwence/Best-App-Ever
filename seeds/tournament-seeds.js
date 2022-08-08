const { Tournament } = require("../models");

const tournamentData = [
  {
    tournament_name: "Overwatch practice tournament",
    description: "This Saturday 8/13.",
    player_quantity: 16,
    game_id: 3
  },
  {
    tournament_name: "Valorant Ranked",
    description: "going for diamond rank",
    player_quantity: 5,
    game_id: 1
  },
  {
    tournament_name: "CS:GO",
    description: "Playing ranked and pubs",
    player_quantity: 3,
    game_id: 2
  },
];

const seedTournaments = () => Tournament.bulkCreate(tournamentData);

module.exports = seedTournaments;
