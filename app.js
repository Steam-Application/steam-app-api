require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
  origin: '*'
}));

const profile = require('./routes/profile.js');

app.use('/profile', profile);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('App listening on port', port));