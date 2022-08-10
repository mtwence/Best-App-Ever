

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


const Tournament = require('./Tournament');
const Game = require('./Game');
const Player = require('./Player');
const TournamentPlayer = require('./TournamentPlayer');

// Tournament2s belongsTo 
Tournament.belongsTo(Game, { 
  foreignKey: "game_id" 
});

// Categories have many Tournament2s
Game.hasMany(Tournament, {
  foreignKey: "game_id",
});

// Tournament2s belongToMany Player2 (through Tournament2Tag)
Tournament.belongsToMany(Player, {
  through: TournamentPlayer,
  foreignKey: "tournament_id",
});

// Player2 belongToMany Tournament2s (through Tournament2Tag)
Player.belongsToMany(Tournament, { 
  through: TournamentPlayer, 
  foreignKey: "player_id" 
});

// module.exports = {
//   Tournament2,
//   Game2,
//   Player2,
//   Tournament2Player2,
// };

//original routes with working create tournament------------------------------------------
// const Tournament2 = require('./Tournament2');
// const Game2 = require('./Game2');
// const Player2 = require('./Player2');
// const Tournament2Player2 = require('./Tournament2Player2');

// // Tournament2s belongsTo 
// Tournament2.belongsTo(Game2, { 
//   foreignKey: "game2_id" 
// });

// // Categories have many Tournament2s
// Game2.hasMany(Tournament2, {
//   foreignKey: "game2_id",
//   // onDelete: "CASCADE",
// });

// // Tournament2s belongToMany Player2 (through Tournament2Tag)
// Tournament2.belongsToMany(Player2, {
//   through: Tournament2Player2,
//   foreignKey: "tournament2_id",
// });

// // Player2 belongToMany Tournament2s (through Tournament2Tag)
// Player2.belongsToMany(Tournament2, { 
//   through: Tournament2Player2, 
//   foreignKey: "player2_id" 
// });

// module.exports = {
//   Tournament2,
//   Game2,
//   Player2,
//   Tournament2Player2,
// };
//---------------------------------------------------------------------------


module.exports = { Player, Tournament, Game, TournamentPlayer  };
