const express = require('express');
const fs = require("fs");
const app =  express();
var path = require('path');
const bodyParser = require("body-parser")

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var public = path.join(appDir, 'public');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/turtle', function(req, res,next)
{
    res.send('Data Received: ' + String(req.body.id));
})

app.listen(3000, function()
{
    console.log('listening on port 3000');
})
