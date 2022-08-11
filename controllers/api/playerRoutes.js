const router = require("express").Router();
const { Player, Tournament, TournamentPlayer } = require("../../models");

// RESTful Routes
// GET POST PUT DELETE
// http://localhost:{PORT}/api/players
// http://deployed-URL.com/api/players

// GET players
// http://localhost:3001/api/players

router.get("/", async (req, res) => {
  // Find all Players and include any associated Tournaments
  try {
    const playerData = await Player.findAll({
      include: [{ model: Tournament }],
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Tournament by Id
// http://localhost:3001/api/players/3

router.get("/:id", async (req, res) => {
  // Find a Player by a specified id and include any associated Tournaments
  try {
    const playerData = await Player.findByPk(req.params.id, {
      include: [{ model: Tournament }],
    });
    if (!playerData) {
      res.status(404).json({ message: "No player found with that id!" });
      return;
    }
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE Player
// http://localhost:3001/api/players

// Example JSON body:
// {
// {
//   player_name: "Michael",
//   email: "michael@aol.com",
//   password: "password12345",
// },
// }

router.post("/", async (req, res) => {
  try {
    const playerData = await Player.create(req.body);
    const data = playerData.get({ plain: true });

    req.session.save(() => {
      req.session.player_id = playerData.id;
      req.session.logged_in = true;
      req.session.player_name = playerData.player_name;

      res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const playerData = await Player.findOne({
      where: { email: req.body.email },
    });

    if (!playerData) {
      res.status(400).json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await playerData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: req.body.password + " Incorrect password, please try again",
      });
      return;
    }

    req.session.save(() => {
      req.session.player_id = playerData.id;
      req.session.logged_in = true;
      req.session.player_name = playerData.player_name;

      res.json({ player: playerData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE Player
// http://localhost:3001/api/players/3

// Example JSON body:
// {
// "player_name" : "New Name"
// }

router.put("/:id", async (req, res) => {
  // update a player's name by its `id` value
  Player.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((player) => {
      // Find all associated TournamentPlayers of the player specified by id
      return TournamentPlayer.findAll({ where: { player_id: req.params.id } });
    })
    .then((playerTournaments) => {
      // Get list of all the current associated Tournament ids and map them unto an array
      const playerProdIds = playerTournaments.map(
        ({ tournament_id }) => tournament_id
      );
      // Create a list of filtered out associated tournaments that are not in the list of current associated tournaments and map them unto an array
      const newTournamentPlayers = req.body.tournamentIds
        .filter((tournament_id) => !playerProdIds.includes(tournament_id))
        .map((tournament_id) => {
          return {
            player_id: req.params.id,
            tournament_id,
          };
        });
      // Create a list of filtered out associated tournaments that are not in the list of associated tournaments passed in the JSON body
      const tournamentPlayersToRemove = playerTournaments
        // if the list of associated tournaments' ids passed in the JSON body does NOT include a current associated tournament's id, map unto an array the id of the TournamentPlayer entry of that associated tournament missing from the tournamentIds in the JSON body
        .filter(
          ({ tournament_id }) => !req.body.tournamentIds.includes(tournament_id)
        )
        .map(({ id }) => id);

      // Destroy/delete the TournamentPlayer entries of each id in the array of TournamentPlayers to remove, then bulk create with the ids in the array of new TournamentPlayers
      return Promise.all([
        TournamentPlayer.destroy({ where: { id: tournamentPlayersToRemove } }),
        TournamentPlayer.bulkCreate(newTournamentPlayers),
      ]);
    })
    .then((updatedTournamentPlayers) => {
      res.json(updatedTournamentPlayers);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE Player
// http://localhost:3001/api/players/3

router.delete("/:id", async (req, res) => {
  try {
    // Destroy/delete a Player by id
    const playerData = await Player.destroy({
      where: { id: req.params.id },
    });
    if (!playerData) {
      res.status(404).json({ message: "No player found with that id!" });
      return;
    }
    res
      .status(200)
      .json(`Deleted Tournament & Player with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
