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
    const userSummary = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${steamid}`);

    res.json(userSummary.data.response.players[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/friends', async(req, res, next) => {
  try {
    const { steamid } = req.query;
    const { data } = await axios.get(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamid}&relationship=friend`);
    const friends = data.friendslist.friends;

    const friendData = await Promise.all(
      friends.map(async friend => {
        const friendInfo = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${friend.steamid}`);
        
        return { ...friend, ...friendInfo.data.response.players[0] }
      })
    );

    res.json(friendData);
  } catch (error) {
    next(error);
  }
});
/*
// Only Returns GroupId
router.get('/groups', async (req, res, next) => {
  try {
    const { steamid } = req.query;
    const { data: groups } = await axios.get(`https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=${process.env.STEAM_KEY}&steamid=${steamid}`)
    
    res.json(groups.response.groups)
  } catch (error) {
    next(error);
  }
});
*/

module.exports = router;