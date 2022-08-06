const { Player2 } = require("../models");

const player2Data = [
  {
    player2_name: "Zori",
    email: "zori@hotmail.com",
    password: "password12345",
  },
  {
    player2_name: "Genesis",
    email: "genesis@gmail.com",
    password: "password12345",
  },
  {
    player2_name: "Michael",
    email: "michael@aol.com",
    password: "password12345",
  },
];

const seedPlayer2s = () => Player2.bulkCreate(player2Data);

module.exports = seedPlayer2s;
