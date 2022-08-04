const Player = require("./Player");
const Tournament = require("./Tournament");
const Game = require("./Game");

Player.belongsToMany(Tournament, {
  through: "player_tournament",
  as: "tournaments",
  foreignKey: "player_id",
});

Tournament.belongsToMany(Player, {
  through: "player_tournament",
  as: "player",
  foreignKey: "tournament_id",
});

Player.belongsToMany(Game, {
  through: "player_game",
  as: "games",
  foreignKey: "player_id",
});

Game.belongsToMany(Player, {
  through: "player_game",
  as: "players",
  foreignKey: "game_id",
});

module.exports = { Player, Tournament, Game };
