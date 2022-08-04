const Player = require('./Player');
const Tournament = require('./Tournament');

Player.belongsToMany(Tournament, {
    through: "player_tournament",
    as: "tournaments",
    foreignKey: "player_id",
    onDelete: 'CASCADE'
  });

Tournament.belongsToMany(Player, {
  through: "player_tournament",
  as: "player",
  foreignKey: "tournament_id",
  onDelete: 'CASCADE'
});



module.exports = { Player, Tournament };