const router = require("express").Router();
const { Tournament, Player } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all tournaments and JOIN with player data
    const tournamentData = await Tournament.findAll({
      include: [
        {
          model: Player,
          attributes: ["name"],
        },
      ],
    });

    const tournaments = tournamentData.map((tournament) => tournament.get({ plain: true }));

    res.render("homepage", {
      tournaments,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;