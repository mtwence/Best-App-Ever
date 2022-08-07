const router = require('express').Router();
const { Tournament2, Game2, Player2, Tournament2Player2 } = require('../../models');

// The `/api/tournament2s` endpoint




//http://localhost:3003/api/tournament2s

// get all tournament2s
router.get('/', async (req, res) => {
  // find all tournament2s
  try {
    const tournament2Data = await Tournament2.findAll({
      include: [{ model: Game2 }, { model: Player2 }],
    });
    res.status(200).json(tournament2Data);
  } catch (err) {
    res.status(500).json(err);
  }
});



//http://localhost:3003/api/tournament2s/2

// get one tournament2
router.get('/:id', async (req, res) => {
  // find a single tournament2 by its `id`
  try {
    const tournament2Data = await Tournament2.findByPk(req.params.id, {
      include: [{ model: Game2 }, { model: Player2 }],
    });
    if (!tournament2Data) {
      res.status(404).json({ message: "No tournament2 found with that id!" });
      return;
    }
    res.status(200).json(tournament2Data);
  } catch (err) {
    res.status(500).json(err);
  }
});



//http://localhost:3003/api/tournament2s

// {
//   "tournament2_name": "SW Battlefront",
//   "description": "fun game.",
//   "player_quantity": 66
// }

// create new tournament2
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tournament2_name: "Basketball",
      price: 200.00,
      stock: 3,
      player2Ids: [1, 2, 3, 4]
    }
  */
  Tournament2.create(req.body)
    .then((tournament2) => {
      // if there's tournament2 player2s, we need to create pairings to bulk create in the Tournament2Player2 model
      if (req.body.player2Ids) {
        const tournament2Player2IdArr = req.body.player2Ids.map((player2_id) => {
          return {
            tournament2_id: tournament2.id,
            player2_id,
          };
        });
        return Tournament2Player2.bulkCreate(tournament2Player2IdArr);
      } 
      res.status(200).json(tournament2);
    })
    .then((tournament2Player2Ids) => res.status(200).json(tournament2Player2Ids))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//http://localhost:3003/api/tournament2s/4
// {
// 	"description" : "Lets play old games"
// }

// update tournament2
router.put('/:id', (req, res) => {
  // update tournament2 data
  Tournament2.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tournament2) => {
      // find all associated player2s from Tournament2Player2
      return Tournament2Player2.findAll({ where: { tournament2_id: req.params.id } });
    })
    .then((tournament2Player2s) => {
      // get list of current player2_ids
      const tournament2Player2Ids = tournament2Player2s.map(({ player2_id }) => player2_id);
      // create filtered list of new player2_ids
      const newTournament2Player2s = req.body.player2Ids
        .filter((player2_id) => !tournament2Player2Ids.includes(player2_id))
        .map((player2_id) => {
          return {
            tournament2_id: req.params.id,
            player2_id,
          };
        });
      // figure out which ones to remove
      const tournament2Player2sToRemove = tournament2Player2s
        .filter(({ player2_id }) => !req.body.player2Ids.includes(player2_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Tournament2Player2.destroy({ where: { id: tournament2Player2sToRemove } }),
        Tournament2Player2.bulkCreate(newTournament2Player2s),
      ]);
    })
    .then((updatedTournament2Player2s) => res.json(updatedTournament2Player2s))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//http://localhost:3003/api/tournament2s/4
router.delete('/:id', async (req, res) => {
  // delete one tournament2 by its `id` value
  try {
    const tournament2Data = await Tournament2.destroy({
      where: { id: req.params.id },
    });
    if (!tournament2Data) {
      res.status(404).json({ message: "No tournament2 found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Tournament2 with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
