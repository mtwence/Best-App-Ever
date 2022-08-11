const router = require("express").Router();
const {
  Game,
  Tournament,
  Player,
  TournamentPlayer,
} = require("../models");
const withAuth = require("../utils/auth");

// Michaels Codng Section:
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();
    const games = gameData.map((games) => games.get({ plain: true }));
    res.render("homepage", {
      games,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all tournaments associated with a specific game 
router.get('/games/:id/tournaments', withAuth, async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [
        {
          model: Tournament
        },
      ],
    });

    const game = gameData.get({ plain: true });

    res.render('all-tournaments', {
      ...game,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//----------------------------------------------------------------

//Member Genesis's coding area --------------------------- login ------------
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const playerData = await player.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const player = playerData.map((player) => player.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      player,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/player/:id", async (req, res) => {
  try {
    const playerData = await player.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const player = playerData.get({ plain: true });

    res.render("homepage", {
      ...player,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/models/Game.js", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const gameData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: player }],
    });

    const game = gameData.get({ plain: true });

    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect("/models/Game.js");
//     return;
//   }

//   res.render("login");
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//------------------------------------------------------------------------------------------

//Member Zori's coding area

// get specific tournament
// URL should be /tournaments/games/game_id ?
router.get("/tournament/:id", withAuth, async (req, res) => {
  try {
    const tournamentData = await Tournament.findByPk(req.params.id, {
      include: [
        {
          model: Player,
          attributes: ["player_name"],
        },
        {
          model: Game,
  
        },
  
      ],
    });

    const tournament = tournamentData.get({ plain: true });

    res.render("tournament", {
      ...tournament,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all tournaments
router.get("/tournaments/", withAuth, async (req, res) => {
  try {
    // Get all tournaments and JOIN with player data
    const tournamentData = await Tournament.findAll({
      include: [
        {
          model: Player,
          attributes: ["player_name"],
        },
        {
          model: Game,
          attributes: ["cover_art"],
        },
      ],
    });

    const tournaments = tournamentData.map((tournament) =>
      tournament.get({ plain: true })
    );

    res.render("all-tournaments", {
      tournaments,
      logged_in: req.session.logged_in,
      player_id: req.session.player_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newTournament", withAuth, async (req, res) => {
  try {
    // Get all tournaments and JOIN with player data
    const tournamentData = await Tournament.findAll({
      include: [
        {
          model: Player,
          attributes: ["player_name"],
        },
        {
          model: Game,
          attributes: ["cover_art"],
        },
      ],
    });

    const tournaments = tournamentData.map((tournament) =>
      tournament.get({ plain: true })
    );
    res.render("newTournament", {
      tournaments,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
