'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const request = require('request')

app.use(bodyParser.json());

//TODO Refactor into ASYNC/AWAIT and Promises
app.get('/users', (req, res) => {
  var options = { method: 'POST',
    url: 'https://wildercommunity.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"fMUotyZYufN1yAnGmmsDtOS3KaWidjo4","client_secret":"ADjxTmgm9iUHTwL8knWpetU_TaCfonGBuamDA8Ur7v-8OsNUnLzF2zDfPtqGXasa","audience":"https://wildercommunity.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };

  var getUserOptions = { method: 'GET',
    url: 'https://wildercommunity.eu.auth0.com/api/v2/users?q=identities.connection:"Username-Password-Authentication"&fields=email,picture,user_metadata'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const data = JSON.parse(body)
    getUserOptions.headers = { authorization: `Bearer ${data.access_token}`}
    request(getUserOptions, function(error, response, body){
      res.json(body)
    })
  });
});

module.exports.handler = serverless(app);
