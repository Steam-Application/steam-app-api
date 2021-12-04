// https://partner.steamgames.com/doc/webapi/ISteamUserStats
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/recentGames', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const RecentGames = await axios.get(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&count=5`);

    res.json(RecentGames.data.response.games);
  } catch (error) {
    next(error);
  }
});

router.get('/ownedGames', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const games = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&include_appinfo=true`);

    res.json(games.data.response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;