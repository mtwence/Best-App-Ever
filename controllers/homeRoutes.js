const router = require("express").Router();
const { Game } = require("../models");
// const withAuth = require("../utils/auth");

// Michaels Codng Section:
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          attributes: ["cover_art"],
        },
      ],
    });

    const game = gameData.get({ plain: true });
    console.log(game);
    res.render("homepage", {
      ...game,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






//Member Zori's coding area

// get specific tournament
// URL should be /tournaments/games/game_id ?
router.get("/tournament/:id", async (req, res) => {
  try {
    const tournamentData = await Tournament.findByPk(req.params.id, {
      include: [
        {
          model: Player,
          attributes: ["name"],
        },
      ],
    });

    const tournament = tournamentData.get({ plain: true });

    res.render("tournament", {
      ...tournament,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all tournaments
router.get("/tournaments/", async (req, res) => {
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

    const tournaments = tournamentData.map((tournament) =>
      tournament.get({ plain: true })
    );

    res.render("allTournaments", {
      tournaments,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
