const router = require("express").Router();
const { Tournament } = require("../../models");
const withAuth = require("../../utils/auth");

// router.post('/', withAuth, async (req, res) => {
router.post("/", async (req, res) => {

  try {
    const newTournament = await Tournament.create({
      ...req.body,
    });
    console.log(newTournament);
    res.status(200).json(newTournament);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
router.delete("/:id", async (req, res) => {
  try {
    const tournamentData = await Tournament.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tournamentData) {
      res.status(404).json({ message: "No tournament found with this id!" });
      return;
    }

    res.status(200).json(tournamentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
