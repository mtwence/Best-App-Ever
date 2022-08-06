const { Tournament2 } = require("../models");

const tournament2Data = [
  {
    tournament2_name: "Halo 3 Saturday Tourney",
    description: "Saturday 7/6.",
    player_quantity: 16,
  },
  {
    tournament2_name: "Valorant Ranked",
    description: "going for diamond rank",
    player_quantity: 5,
  },
  {
    tournament2_name: "Apex Ranked",
    description: "Playing ranked gold to diamond.",
    player_quantity: 3,
  },
];

const seedTournament2s = () => Tournament2.bulkCreate(tournament2Data);

module.exports = seedTournament2s;
