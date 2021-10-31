const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/resolveId', async (req, res, next) => {
  try {
    const { username } = req.query;
    const vanityInfo = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_KEY}&vanityurl=${username}&url_type=1`);

    res.json(vanityInfo.data);
  } catch (error) {
    next(error);
  }
});

router.get('/userSummary', async (req, res, next) => {
  try {
    const { id } = req.query;
    const userSummary = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${id}`);

    res.json(userSummary.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;