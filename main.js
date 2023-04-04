const express = require('express');
const fs = require("fs");
const app =  express();
var path = require('path');

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var public = path.join(appDir, 'public');

app.get('/', function(req, res)
{
    res.send("hi"); 
})

app.use('/', express.static(public));

app.listen(3000, function()
{
    console.log('listening on port 3000');
})