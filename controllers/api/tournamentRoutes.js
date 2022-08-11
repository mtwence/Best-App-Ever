const router = require('express').Router();
const { players } = require('tournament/lib/match');
const { Tournament, Game, Player, TournamentPlayer } = require('../../models');

// RESTful Routes
// GET POST PUT DELETE
// http://localhost:{PORT}/api/tournaments
// http://deployed-URL.com/api/tournaments


// GET Tournaments
// http://localhost:3001/api/tournaments

router.get('/', async (req, res) => {
  try {
    // Find all Tournaments and include any associated Games and Players
    const tournamentData = await Tournament.findAll({
      include: [{ model: Game }, { model: Player }],
    });
    res.status(200).json(tournamentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET Tournament by Id
// http://localhost:3001/api/tournaments/3

router.get('/:id', async (req, res) => {
  try {
      // Find a Tournament by a specified id and include any associated Games and Players
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

// CREATE Tournament
// http://localhost:3001/api/tournaments

// Example JSON body:
// {
  // tournament_name: "5v5 Custom",
  // description: "For funzies",
  // player_quantity: 10,
  // game_id: 1
// }

router.post('/', (req, res) => {
 // Create a tournament 
  Tournament.create(req.body)
    .then((tournament) => {
      // If there are associated Players
      if (req.body.playerIds) {
        // create a pairing between the tournament id and each player id, and map each pairing as one entry unto an array
        const tournamentPlayerIdArr = req.body.playerIds.map((player_id) => {
          return {
            //each entry being mapped is an object with key value pairs of the tournament id and a player id
            tournament_id: tournament.id,
            player_id,
          };
        });
        // bulk create with the array of the pairings of tournament id and player ids
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

// UPDATE Tournament
// http://localhost:3001/api/tournaments/3

// Example JSON body:
// {
  // "playerIds" : [1,2,3,4]
// }

router.put('/:id', (req, res) => {
  console.log("put route: " + req.body.playerIds)
  // Update a Tournament specified by an id
  Tournament.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tournament) => {
      // Find all associated Players of the tournament specified by id
      return TournamentPlayer.findAll({ where: { tournament_id: req.params.id } });
    })
    .then((tournamentPlayers) => {
      // Get list of all the current associated Players ids and map them unto an array
      const tournamentPlayerIds = tournamentPlayers.map(({ player_id }) => player_id);
      // Create a list of filtered out associated players that are not in the list of current associated players and map them unto an array
      const newTournamentPlayers = req.body.playerIds
        .filter((player_id) => !tournamentPlayerIds.includes(player_id))
        .map((player_id) => {
          return {
            tournament_id: req.params.id,
            player_id,
          };
        });
      // Create a list of filtered out associated players that are not in the list of associated players passed in the JSON body
      const tournamentPlayersToRemove = tournamentPlayers
      // if the list of associated players' ids passed in the JSON body does NOT include a current associated player's id, map unto an array the id of the TournamentPlayer entry of that associated player missing from the playerIds in the JSON body 
        .filter(({ player_id }) => !req.body.playerIds.includes(player_id))
        .map(({ id }) => id);

      // Destroy/delete the TournamentPlayer entries of each id in the array of TournamentPlayers to remove, then bulk create with the ids in the array of new TournamentPlayers
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

// DELETE Tournament
// http://localhost:3001/api/tournaments/3

router.delete('/:id', async (req, res) => {
  // Destroy/delete a Tournament by id
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
