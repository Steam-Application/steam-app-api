const express = require('express');
const axios = require('axios');
let router = express.Router();

const idCheck = /^\d{17}$/

router.get('/', async (req, res, next) => {
  try {
    let id = req.query.id;
    
    if (!id.match(idCheck)) {
      const vanityInfo = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_KEY}&vanityurl=${id}&url_type=1`);

      if (vanityInfo.data.success === 0) {
        // Error
      } else {
        id = vanityInfo.data.response.steamid;
      }
    }

    const info = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${id}`);

    res.json(info.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;