const router = require('express').Router();
const { DEFAULT_MAX_VERSION } = require('tls');
const { Game } = require('../../models');
const withAuth = require('../../utils/auth');








// For now we are going to use static game elements so there wont be need for creating or DEFAULT_MAX_VERSION. Adding for future sprint cycle 
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newGame = await Game.create({
//       ...req.body,
//       player_id: req.session.player_id,
//     });

//     res.status(200).json(newGame);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const gameData = await Game.destroy({
//       where: {
//         id: req.params.id,
//         player_id: req.session._id,
//       },
//     });

//     if (!gameData) {
//       res.status(404).json({ message: 'No game found with this id!' });
//       return;
//     }

//     res.status(200).json(gameData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
