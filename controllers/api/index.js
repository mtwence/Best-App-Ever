const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/players', playerRoutes);
router.use('/games', gameRoutes);

module.exports = router;
