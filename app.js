require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ origin: '*' }));

const profile = require('./routes/profile.js');
const games = require('./routes/games.js')
const achievements = require('./routes/achievements.js');

app.use('/profile', profile);
app.use('/games', games);
app.use('/achievements', achievements);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('App listening on port', port));