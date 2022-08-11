const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const gameRoutes = require('./gameRoutes');
const tournamentRoutes = require('./tournamentRoutes');

router.use('/players', playerRoutes);
router.use('/games', gameRoutes);
router.use('/tournaments', tournamentRoutes);

module.exports = router;

