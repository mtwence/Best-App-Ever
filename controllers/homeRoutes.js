const router = require("express").Router();
const { Game, Tournament, Player } = require("../models");
const withAuth = require("../utils/auth");


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
    res.render("homepage", {
      ...game,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Member Genesis's coding area --------------------------- login ------------
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const playerData = await player.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const player = playerData.map((player) => player.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      player, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/player/:id', async (req, res) => {
  try {
    const playerData = await player.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const player = playerData.get({ plain: true });

    res.render('homepage', {
      ...player,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/models/Game.js', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const gameData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: player }],
    });

    const game = gameData.get({ plain: true });

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/models/Game.js');
    return;
  }

  res.render('login');
});

//------------------------------------------------------------------------------------------




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
