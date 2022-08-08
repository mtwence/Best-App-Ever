const { Tournament } = require("../models");

const tournamentData = [
  {
    tournament_name: "Overwatch practice tournament",
    description: "This Saturday 8/13.",
    player_quantity: 16,
    game_id: 3
  },
  {
    tournament_name: "Diamond Boys",
    description: "Going for diamond",
    player_quantity: 5,
    game_id: 1
  },
  {
    tournament_name: "5v5 Custom",
    description: "For funzies",
    player_quantity: 10,
    game_id: 1
  },
  {
    tournament_name: "Road to Radiant",
    description: "We HAWTTTTT",
    player_quantity: 5,
    game_id: 1
  },
  {
    tournament_name: "Nova Boys need 2",
    description: "Playing ranked and pubs",
    player_quantity: 2,
    game_id: 2
  },
  {
    tournament_name: "Road to Global",
    description: "Assembling a team of noob stompers",
    player_quantity: 5,
    game_id: 2
  },
  {
    tournament_name: "Fragadelphia",
    description: "10 teams in Philly area compete",
    player_quantity:50 ,
    game_id: 2
  },
];

const seedTournaments = () => Tournament.bulkCreate(tournamentData);

module.exports = seedTournaments;
