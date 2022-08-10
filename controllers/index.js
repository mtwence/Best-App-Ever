// Testing dynamic game cover_art generation from video game database API
// let clientId = "0at2pjw8y4oox3x0f3j68210nfo9l7"
// let secret ="d66lvot6b37muihs27fjvql1wecczt"

// https://id.twitch.tv/oauth2/token?client_id=0at2pjw8y4oox3x0f3j68210nfo9l7&client_secret=d66lvot6b37muihs27fjvql1wecczt&grant_type=client_credentials
// axios({
//     url: "https://api.igdb.com/v4/covers",
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Client-ID': 'Client ID',
//         'Authorization': 'Bearer access_token',
//     },
//     data: "fields alpha_channel,animated,checksum,game,height,image_id,url,width;"
//   })
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(err => {
//         console.error(err);
//     });

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;