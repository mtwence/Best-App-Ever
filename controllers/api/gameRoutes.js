const router = require("express").Router();
const { Game, Tournament } = require("../../models");

// RESTful Routes
// GET POST PUT DELETE
// http://localhost:{PORT}/api/games
// http://deployed-URL.com/api/games

// GET Tournaments
// http://localhost:3001/api/games

router.get("/", async (req, res) => {
  // Find all Games and include any associated Tournaments
  try {
    const gamesData = await Game.findAll({
      include: [{ model: Tournament }],
    });
    res.status(200).json(gamesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Game by Id
// http://localhost:3001/api/games/3

router.get("/:id", async (req, res) => {
  // Find a Game by a specified id and include any associated Tournaments
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Tournament }],
    });
    if (!game2Data) {
      res.status(404).json({ message: "No game found with that id!" });
      return;
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE Game
// http://localhost:3001/api/games

// Example JSON body:
// {
//   game_name: "Overwatch",
//   description: "Brawl 5v5 hero shooter",
//   cover_art:
//     "https://cdn.thegamesdb.net/images/original/boxart/front/32185-1.jpg",
//   game_type: "shooter",

// },

router.post("/", async (req, res) => {
  try {
    const gameData = await Game.create(req.body);
    res.status(200).json(gameData);
  } catch (error) {
    res.status(400).json(err);
  }
});

// UPDATE Game
// http://localhost:3001/api/games/3

// Example JSON body:
// {
//  "game_name": "Overwatch - Limited Edition",
// }

router.put("/:id", async (req, res) => {
  try {
    const gameData = await Game.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!gameData) {
      res.status(404).json({ message: "No game found with that id!" });
      return;
    }
    res.status(200).json(gameData);
  } catch (error) {
    res.status(400).json(err);
  }
});

// DELETE Game
// http://localhost:3001/api/games/3

router.delete("/:id", async (req, res) => {
  // Destroy/delete a Game by id
  try {
    const gameData = await Game.destroy({
      where: { id: req.params.id },
    });
    if (!gameData) {
      res.status(404).json({ message: "No game found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Game with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
