const router = require('express').Router();
const { Player2, Tournament2, Tournament2Player2 } = require('../../models');

// The `/api/player2s` endpoint

router.get('/', async (req, res) => {
  // find all player2s
  try {
    const player2Data = await Player2.findAll({
      include: [{ model: Tournament2 }],
    });
    res.status(200).json(player2Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single player2 by its `id`
  try {
    const player2Data = await Player2.findByPk(req.params.id, {
      include: [{ model: Tournament2 }],
    });
    if (!player2Data) {
      res.status(404).json({ message: "No player2 found with that id!" });
      return;
    }
    res.status(200).json(player2Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  Player2.create(req.body)
    .then((player2) => {
      // if there are tournament2 player2s, we need to create pairings to bulk create in the Tournament2Player2 model
      if (req.body.tournament2Ids.length) {
        const tournament2IdArr = req.body.tournament2Ids.map((tournament2_id) => {
          return {
            player2_id: player2.id,
            tournament2_id,
          };
        });
        return Tournament2Player2.bulkCreate(tournament2IdArr);
      }
      // if no tournament2 player2s, just respond
      res.status(200).json(player2);
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a player2's name by its `id` value
  Player2.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((player2) => {
      // find all associated player2s from Tournament2Player2
      return Tournament2Player2.findAll({ where: { player2_id: req.params.id } });
    })
    .then((player2Tournament2s) => {
      // get list of current player2_ids
      const player2ProdIds = player2Tournament2s.map(({ tournament2_id }) => tournament2_id);
      // create filtered list of new player2_ids
      const newTournament2Player2s = req.body.tournament2Ids
        .filter((tournament2_id) => !player2ProdIds.includes(tournament2_id))
        .map((tournament2_id) => {
          return {
            player2_id: req.params.id,
            tournament2_id,
          };
        });
      // figure out which ones to remove
      const tournament2Player2sToRemove = player2Tournament2s
        .filter(({ tournament2_id }) => !req.body.tournament2Ids.includes(tournament2_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Tournament2Player2.destroy({ where: { id: tournament2Player2sToRemove } }),
        Tournament2Player2.bulkCreate(newTournament2Player2s),
      ]);
    })
    .then((updatedTournament2Player2s) => {
      res.json(updatedTournament2Player2s);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const player2Data = await Player2.destroy({
      where: { id: req.params.id },
    });
    if (!player2Data) {
      res.status(404).json({ message: "No player2 found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Tournament2 Player2 with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
