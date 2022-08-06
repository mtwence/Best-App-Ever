// const Player = require("./Player");
// const Tournament = require("./Tournament");
// const Game = require("./Game");
// const Game2 = require("./Game2");
// const Player2 = require("./Player2");

//from miniproject
// Player.hasMany(Tournament,{
//   foreignKey: 'player_id',
//   onDelete: 'CASCADE'
// });

// Tournament.belongsTo(Player, {
//   foreignKey: 'host_id',
// })

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

// Game2.belongsToMany(Player2, {
//   through: "game2_player2",
//   as: "player2s",
//   foreignKey: "game2_id",
// })

// Player2.belongsToMany(Game2, {
//   through: "game2_player2",
//   as: "game2s",
//   foreignKey: "player2_id",
//   });

//member Zori's coding section -----------------------------------------------

// import models
// const Product = require('./Product');
// const Category = require('./Category');
// const Tag = require('./Tag');
// const ProductTag = require('./ProductTag');

//Product = Tournament2
//Category = Game2
//Tag = Player2

const Tournament2 = require('./Tournament2');
const Game2 = require('./Game2');
const Player2 = require('./Player2');
const Tournament2Player2 = require('./Tournament2Player2');

// Products belongsTo 
Tournament2.belongsTo(Game2, { 
  foreignKey: "game2_id" 
});

// Categories have many Products
Game2.hasMany(Tournament2, {
  foreignKey: "game2_id",
  // onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Tournament2.belongsToMany(Player2, {
  through: Tournament2Player2,
  foreignKey: "tournament2_id",
});

// Tags belongToMany Products (through ProductTag)
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
//Product = Tournament2
//Category = Game2
//Tag = Player2
//Tournament2Player2

// module.exports = { Player, Tournament, Game, Game2, Player2, Tournament2, Tournament2Player2  };
module.exports = { Game2, Player2, Tournament2, Tournament2Player2  };