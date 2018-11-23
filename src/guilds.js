'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//TODO Refactor into ASYNC/AWAIT and Promises
app.get('/guilds', (req, res) => {
  res.json({guilds:'guilds'})
});

module.exports.handler = serverless(app);
