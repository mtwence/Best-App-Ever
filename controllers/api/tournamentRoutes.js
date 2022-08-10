const router = require('express').Router();
const { players } = require('tournament/lib/match');
const { Tournament, Game, Player, TournamentPlayer } = require('../../models');

// RESTful Routes
// GET POST PUT DELETE
// http://localhost:3003/api/tournaments
// http://deployed-URL.com/api/tournaments


// GET Tournaments
// http://localhost:3003/api/tournaments

router.get('/', async (req, res) => {
  // Find all Tournaments and include any associated Games and Players
  try {
    const tournamentData = await Tournament.findAll({
      include: [{ model: Game }, { model: Player }],
    });
    res.status(200).json(tournamentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET Tournament by Id
// http://localhost:3003/api/tournaments/3

router.get('/:id', async (req, res) => {
  // Find a Tournament by a specified id and include any associated Games and Players
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
//   "tournament_name": "SW Battlefront",
//   "description": "fun game.",
//   "player_quantity": 66
// }

// create new tournament
router.post('/', (req, res) => {
 
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

//testing put route after presentation--------------------------  

router.put('/:id', (req, res) => {
  console.log("put route: " + req.body.playerIds)
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
