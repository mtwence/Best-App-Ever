const Player = require("./Player");
const Tournament = require("./Tournament");
const Game = require("./Game");


//from miniproject
Player.hasMany(Tournament,{
  foreignKey: 'player_id',
  onDelete: 'CASCADE'
});

Tournament.belongsTo(Player, {
  foreignKey: 'host_id',
})

//many to many relations  
// Player.belongsToMany(Tournament, {
//   through: "player_tournament",
//   as: "tournaments",
//   foreignKey: "player_id",
// });

// Tournament.belongsToMany(Player, {
//   through: "player_tournament",
//   as: "player",
//   foreignKey: "tournament_id",
// });

// Player.belongsToMany(Game, {
//   through: "player_game",
//   as: "games",
//   foreignKey: "player_id",
// });

// Game.belongsToMany(Player, {
//   through: "player_game",
//   as: "players",
//   foreignKey: "game_id",
// });


//member Zori's coding section -----------------------------------------------


const Tournament2 = require('./Tournament2');
const Game2 = require('./Game2');
const Player2 = require('./Player2');
const Tournament2Player2 = require('./Tournament2Player2');

// Tournaments belong to one game
Tournament2.belongsTo(Game2, 
  {
    foreignKey: "game2_id",
    as: "games",
  });

// Games have many Tournament2s
Game2.hasMany(Tournament2, {as: "tournaments"});

// Tournament2s belongToMany Player2 (through Tournament2Tag)
Tournament2.belongsToMany(Player2, {
  through: Tournament2Player2,
  foreignKey: "tournament2_id",
});

// Player2 belongToMany Tournament2s (through Tournament2Tag)
Player2.belongsToMany(Tournament2, { 
  through: Tournament2Player2, 
  foreignKey: "player2_id" 
});

module.exports = {
  Tournament2,
  Game2,
  Player2,
  Tournament2Player2,
};


module.exports = { Player, Tournament, Game, Game2, Player2, Tournament2, Tournament2Player2  };
