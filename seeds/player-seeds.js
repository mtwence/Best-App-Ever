const { Player } = require("../models");

const playerData = [
  {
    player_name: "Zori",
    email: "zori@hotmail.com",
    password: "password12345",
  },
  {
    player_name: "Genesis",
    email: "genesis@gmail.com",
    password: "password12345",
  },
  {
    player_name: "Michael",
    email: "michael@aol.com",
    password: "password12345",
  },
];

const seedPlayers = () => Player.bulkCreate(playerData);

module.exports = seedPlayers;
