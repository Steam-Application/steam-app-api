const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/resolveId', async (req, res, next) => {
  try {
    const { username } = req.query;
    const { data: vanityInfo } = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_KEY}&vanityurl=${username}&url_type=1`);

    res.json(vanityInfo);
  } catch (error) {
    next(error);
  }
});

router.get('/userSummary', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const { data: userSummary } = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${steamid}`);

    res.json(userSummary);
  } catch (error) {
    next(error);
  }
});

/*
Owned Games
https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/
const { data: Games } = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&include_appinfo=true`);

User Inventory
https://partner.steamgames.com/doc/webapi/IInventoryService

*/

module.exports = router;