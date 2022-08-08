const router = require('express').Router();
const { Player, Tournament, TournamentPlayer } = require('../../models');

// The `/api/players` endpoint

router.get('/', async (req, res) => {
  // find all players
  try {
    const playerData = await Player.findAll({
      include: [{ model: Tournament }],
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single player by its `id`
  try {
    const playerData = await Player.findByPk(req.params.id, {
      include: [{ model: Tournament2 }],
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

router.post('/', async (req, res) => {
  Player.create(req.body)
    .then((player) => {
      // if there are tournament players, we need to create pairings to bulk create in the TournamentPlayer model
      if (req.body.tournamentIds.length) {
        const tournamentIdArr = req.body.tournamentIds.map((tournament_id) => {
          return {
            player_id: player.id,
            tournament_id,
          };
        });
        return TournamentPlayer.bulkCreate(tournamentIdArr);
      }
      // if no tournament players, just respond
      res.status(200).json(player);
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a player's name by its `id` value
  Player.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((player) => {
      // find all associated players from TournamentPlayer
      return TournamentPlayer.findAll({ where: { player_id: req.params.id } });
    })
    .then((playerTournaments) => {
      // get list of current player_ids
      const playerProdIds = playerTournaments.map(({ tournament_id }) => tournament_id);
      // create filtered list of new player_ids
      const newTournamentPlayers = req.body.tournament2Ids
        .filter((tournament_id) => !playerProdIds.includes(tournament_id))
        .map((tournament_id) => {
          return {
            player_id: req.params.id,
            tournament_id,
          };
        });
      // figure out which ones to remove
      const tournamentPlayersToRemove = playerTournaments
        .filter(({ tournament_id }) => !req.body.tournamentIds.includes(tournament_id))
        .map(({ id }) => id);

      // run both actions
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

router.delete('/:id', async (req, res) => {
  try {
    const playerData = await Player.destroy({
      where: { id: req.params.id },
    });
    if (!playerData) {
      res.status(404).json({ message: "No player found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Tournament & Player with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
