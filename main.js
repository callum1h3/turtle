const express = require('express');
const fs = require("fs");
const app =  express();
var path = require('path');
const bodyParser = require("body-parser")

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var public = path.join(appDir, 'public');

app.get('/:id', function(req, res)
{
    res.send('Data Received: ' + String(req.params.id));
})

app.listen(3000, function()
{
    console.log('listening on port 3000');
})
