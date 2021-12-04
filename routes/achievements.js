// https://partner.steamgames.com/doc/webapi/ISteamUserStats
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/getAchievements', async (req, res, next) => {
  try {
    const { gameid, steamid } = req.query;
    const userStats = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&appid=${gameid}&l=english`);
    const globalStats = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${gameid}`);

    const playerAchievements = userStats.data.playerstats.achievements;
    const globalAchievements = globalStats.data.achievementpercentages.achievements;

    playerAchievements.forEach((achievement, i) => {
      const index = globalAchievements.findIndex(item => item.name === achievement.apiname);
      const global = globalAchievements.splice(index, 1)[0];
      playerAchievements[i].percent = global.percent;
    });

    res.json(playerAchievements);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;