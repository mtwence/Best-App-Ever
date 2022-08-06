const { Game2 } = require("../models");

const game2Data = [
  {
    game2_name: "Valorant",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://i.ibb.co/CmCnT8H/header-30-gaming-logos-for-valorant-clans-brandcrowd-blog.png",
    game_type: "shooter",
  },
  {
    game2_name: "Counter Strike: Global Offensive",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://www.dogtime.com/assets/uploads/2018/10/puppies-cover.jpg",
    game_type: "shooter",
  },
  {
    game2_name: "Overwatch",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://www.dogtime.com/assets/uploads/2018/10/puppies-cover.jpg",
    game_type: "shooter",
  },
  {
    game2_name: "Rainbow Six Siege",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://www.dogtime.com/assets/uploads/2018/10/puppies-cover.jpg",
    game_type: "shooter",
  },
];

const seedGame2s = () => Game2.bulkCreate(game2Data);

module.exports = seedGame2s;
