const { Game } = require("../models");

const gameData = [
  {
    game_name: "Valorant",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/72904-1.jpg",
    game_type: "shooter",
  
  },
  {
    game_name: "Counter Strike: Global Offensive",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/10771-1.jpg",
    game_type: "shooter",
  
  },
  {
    game_name: "Overwatch",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/32185-1.jpg",
    game_type: "shooter",
  
  },
  {
    game_name: "Rainbow Six Siege",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/33336-1.jpg",
    game_type: "shooter",
  
  },
  {
    game_name: "Mortal Kombat 11",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/62527-1.jpg",
    game_type: "fighter",
  
  },
  {
    game_name: "Marvel v Capcom 3",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1yej.png",
    game_type: "fighter",
  
  },
  {
    game_name: "Street Fighter 5",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1pka.png",
    game_type: "fighter",
  
  },
  {
    game_name: "Tekken 7",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w4f.png",
    game_type: "fighter",
  
  },
  {
    game_name: "League of Legends",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/928-1.jpg",
    game_type: "moba",
  
  },
  {
    game_name: "DOTA 2",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4bko.png",
    game_type: "moba",
  
  },
  {
    game_name: "Heroes of the Storm",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/48640-1.jpg",
    game_type: "moba",
  
  },
  {
    game_name: "Smite",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/65951-1.jpg",
    game_type: "moba",
  
  },
  {
    game_name: "Among Us",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/77267-1.jpg",
    game_type: "party",
  
  },
  {
    game_name: "Gang Beasts",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/29244-1.jpg",
    game_type: "party",
  
  },
  {
    game_name: "Pummel Party",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co20uq.png",
    game_type: "party",
  
  },
  {
    game_name: "Rocket League",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/29478-1.jpg",
    game_type: "party",
  
  },
  {
    game_name: "F1 22",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/99857-1.jpg",
    game_type: "sport",
  
  },
  {
    game_name: "FIFA 22",
    description: "Tactical 5v5 shooter",
    cover_art:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3dsm.png",
    game_type: "sport",
  
  },
  {
    game_name: "NBA 2k22",
    description: "Brawl 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/99058-1.jpg",
    game_type: "sport",
  
  },
  {
    game_name: "PGA 2k21",
    description: "Tactical 5v5 hero shooter",
    cover_art:
      "https://cdn.thegamesdb.net/images/original/boxart/front/94427-1.jpg",
    game_type: "sport",
  
  },
];

const seedGames = () => Game.bulkCreate(gameData);

module.exports = seedGames;
