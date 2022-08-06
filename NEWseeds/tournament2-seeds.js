const { Tournament2 } = require("../models");

const tournament2Data = [
  {
    tournament2_name: "Overwatch",
    description: "Saturday 7/6.",
    player_quantity: 16,
    game2_id: 3
  },
  {
    tournament2_name: "Valorant Ranked",
    description: "going for diamond rank",
    player_quantity: 5,
    game2_id: 1
  },
  {
    tournament2_name: "CS:GO",
    description: "Playing ranked and pubs",
    player_quantity: 3,
    game2_id: 2
  },
];

const seedTournament2s = () => Tournament2.bulkCreate(tournament2Data);

module.exports = seedTournament2s;
