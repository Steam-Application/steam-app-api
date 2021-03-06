// https://partner.steamgames.com/doc/webapi/ISteamUserStats
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/recentGames', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const { data } = await axios.get(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&count=5`);

    res.json(data.response.games);
  } catch (error) {
    next(error);
  }
});

router.get('/ownedGames', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const { data } = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&include_appinfo=true`);

    res.json(data.response);
  } catch (error) {
    next(error);
  }
});

router.get('/game', async (req, res, next) => {
  try {
    const { steamid, gameid} = req.query;
    const gameData = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&include_appinfo=true&appids_filter[0]=${gameid}`);
    const newsData = await axios.get(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${gameid}&maxlength=1&count=5`);

    const game = gameData.data.response.games[0];
    const news = newsData.data.appnews.newsitems;

    res.json({ game, news });
  } catch (error) {
    next(error);
  }
});

/*
// Limits to 1-2 calls per 2min -- Basically not effective.
router.get('/gameInventory', async (req, res, next) => {
  try {
    const { steamid, appid } = req.query;
    const { data: inventory } = await axios.get(`https://steamcommunity.com/profiles/${steamid}/inventory/json/${appid}/2`);
    
    res.json(inventory);
  } catch (error) {
    next(error)
  }
});
*/

module.exports = router;