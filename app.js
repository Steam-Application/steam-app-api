require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
const users = require('./routes/users.js');

app.use('/users', users);

app.listen(port, () => console.log('App listening on port', port));