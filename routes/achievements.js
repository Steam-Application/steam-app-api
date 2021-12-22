// https://partner.steamgames.com/doc/webapi/ISteamUserStats
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Adds More Detial to Achievements // Pictures, etc
// https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/
router.get('/getAchievements', async (req, res, next) => {
  try {
    const { gameid, steamid } = req.query;
    
    const userStats = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}&appid=${gameid}&l=english`);
    const globalStats = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${gameid}`);
    const gameData = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${process.env.STEAM_KEY}&appid=${gameid}&l=english`);

    const playerAchievements = userStats.data.playerstats.achievements;
    const globalAchievements = globalStats.data.achievementpercentages.achievements;
    const gameSchema = gameData.data.game.availableGameStats.achievements;

    const achieved = [];
    const locked = [];
    let count = 0;

    playerAchievements.forEach((achievement, i) => {
      const index = globalAchievements.findIndex(item => item.name === achievement.apiname);
      const global = globalAchievements.splice(index, 1)[0];
      achievement.percent = global.percent;

      const index2 = gameSchema.findIndex(item => item.name === achievement.apiname);
      const schema = gameSchema.splice(index2, 1)[0];
      achievement.hidden = schema.hidden; 
      achievement.icon = schema.icon; 
      achievement.icongray = schema.icongray; 

      if (achievement.achieved) {
        achieved.push(achievement);
        count++;
      } else {
        locked.push(achievement);
      }
    });

    const percent = (count / playerAchievements.length * 100).toFixed(2);

    res.json({ percent, achieved, locked });
  } catch (error) {
    if (error.response.data.playerstats.error === 'Requested app has no stats') {
      res.json({ percent: -1, achieved: [], locked: [] });
    } else {
      next(error);
    }
  }
});

module.exports = router;