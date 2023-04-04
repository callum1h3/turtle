const express = require('express');
const fs = require("fs");
const app =  express();
var path = require('path');

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var public = path.join(appDir, 'public');

app.post('/', function(req, res)
{
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
})

app.use('/', express.static(public));

app.listen(3000, function()
{
    console.log('listening on port 3000');
})
