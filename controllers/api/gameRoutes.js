const router = require('express').Router();
const { Game, Tournament } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all games
  try {
    const gamesData = await Game.findAll({
      include: [{ model: Tournament }],
    });
    res.status(200).json(gamesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one game by its `id` value
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

router.post('/', async (req, res) => {
  // create a new game
  try {
    const gameData = await Game.create(req.body);
    res.status(200).json(gameData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a game by its `id` value
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

router.delete('/:id', async (req, res) => {
  // delete a game by its `id` value
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
