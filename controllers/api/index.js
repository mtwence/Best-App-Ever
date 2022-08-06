const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const gameRoutes = require('./gameRoutes');
const tournamentRoutes = require('./tournamentRoutes');

const player2Routes = require('./player2Routes');
const game2Routes = require('./game2Routes');
const tournament2Routes = require('./tournament2Routes');

router.use('/players', playerRoutes);
router.use('/games', gameRoutes);
router.use('/tournaments', tournamentRoutes);

router.use('/player2s', player2Routes);
router.use('/game2s', game2Routes);
router.use('/tournament2s', tournament2Routes);

module.exports = router;

