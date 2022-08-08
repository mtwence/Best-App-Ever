const router = require('express').Router();
const { Tournament, Game, Player, TournamentPlayer } = require('../../models');

// The `/api/tournaments` endpoint




//http://localhost:3003/api/tournament2s

// get all tournaments
router.get('/', async (req, res) => {
  // find all tournaments
  try {
    const tournamentData = await Tournament.findAll({
      include: [{ model: Game }, { model: Player }],
    });
    res.status(200).json(tournamentData);
  } catch (err) {
    res.status(500).json(err);
  }
});



//http://localhost:3003/api/tournaments/3

// get one tournament
router.get('/:id', async (req, res) => {
  // find a single tournament by its `id`
  try {
    const tournamentData = await Tournament.findByPk(req.params.id, {
      include: [{ model: Game }, { model: Player }],
    });
    if (!tournamentData) {
      res.status(404).json({ message: "No tournament found with that id!" });
      return;
    }
    res.status(200).json(tournamentData);
  } catch (err) {
    res.status(500).json(err);
  }
});



//http://localhost:3003/api/tournaments

// {
//   "tournament2_name": "SW Battlefront",
//   "description": "fun game.",
//   "player_quantity": 66
// }

// create new tournament
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tournament2_name: "Basketball",
      price: 200.00,
      stock: 3,
      player2Ids: [1, 2, 3, 4]
    }
  */
  Tournament.create(req.body)
    .then((tournament) => {
      // if there's tournament players, we need to create pairings to bulk create in the TournamentPlayer model
      if (req.body.playerIds) {
        const tournamentPlayerIdArr = req.body.playerIds.map((player_id) => {
          return {
            tournament_id: tournament.id,
            player_id,
          };
        });
        return TournamentPlayer.bulkCreate(tournamentPlayerIdArr);
      } 
      res.status(200).json(tournament);
    })
    .then((tournamentPlayerIds) => res.status(200).json(tournamentPlayerIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//http://localhost:3003/api/tournaments/4
// {
// 	"description" : "Lets play old games"
// }

// update tournament
router.put('/:id', (req, res) => {
  // update tournament data
  Tournament.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tournament) => {
      // find all associated players from TournamentPlayer
      return TournamentPlayer.findAll({ where: { tournament_id: req.params.id } });
    })
    .then((tournamentPlayers) => {
      // get list of current player_ids
      const tournamentPlayerIds = tournamentPlayers.map(({ player_id }) => player_id);
      // create filtered list of new player_ids
      const newTournamentPlayers = req.body.playerIds
        .filter((player_id) => !tournamentPlayerIds.includes(player_id))
        .map((player_id) => {
          return {
            tournament_id: req.params.id,
            player_id,
          };
        });
      // figure out which ones to remove
      const tournamentPlayersToRemove = tournamentPlayers
        .filter(({ player_id }) => !req.body.playerIds.includes(player_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        TournamentPlayer.destroy({ where: { id: tournamentPlayersToRemove } }),
        TournamentPlayer.bulkCreate(newTournamentPlayers),
      ]);
    })
    .then((updatedTournamentPlayers) => res.json(updatedTournamentPlayers))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//http://localhost:3003/api/tournaments/4
router.delete('/:id', async (req, res) => {
  // delete one tournament by its `id` value
  try {
    const tournamentData = await Tournament.destroy({
      where: { id: req.params.id },
    });
    if (!tournamentData) {
      res.status(404).json({ message: "No tournament found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Tournament with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
