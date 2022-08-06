const router = require('express').Router();
const { Game2, Tournament2 } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoriesData = await Game2.findAll({
      include: [{ model: Tournament2 }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one game2 by its `id` value
  try {
    const game2Data = await Game2.findByPk(req.params.id, {
      include: [{ model: Tournament2 }],
    });
    if (!game2Data) {
      res.status(404).json({ message: "No game2 found with that id!" });
      return;
    }
    res.status(200).json(game2Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new game2
  try {
    const game2Data = await Game2.create(req.body);
    res.status(200).json(game2Data);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a game2 by its `id` value
  try {
    const game2Data = await Game2.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!game2Data) {
      res.status(404).json({ message: "No game2 found with that id!" });
      return;
    }
    res.status(200).json(game2Data);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a game2 by its `id` value
  try {
    const game2Data = await Game2.destroy({
      where: { id: req.params.id },
    });
    if (!game2Data) {
      res.status(404).json({ message: "No game2 found with that id!" });
      return;
    }
    res.status(200).json(`Deleted Game2 with id ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
