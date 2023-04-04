const express = require('express');
const fs = require("fs");
const app =  express();
var path = require('path');
const bodyParser = require("body-parser")

const { dirname } = require('path');
const { domainToASCII } = require('url');
const appDir = dirname(require.main.filename);
var public = path.join(appDir, 'public');
var turtle_commands = {};

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/turtle', function(req, res,next)
{
    let id = req.body.id
    if (!(id in turtle_commands))
    {
        turtle_commands[id] = {}
        turtle_commands[id]["queuedcommands"] = []
    }

    turtle_commands[id]["info"] = {
        x : req.body.x,
        y : req.body.y,
        z : req.body.z
    };

    res.send(JSON.stringify(turtle_commands[id]["queuedcommands"]));
    turtle_commands[id]["queuedcommands"] = []
})

app.post('/master', function(req, res,next)
{
    res.send(JSON.stringify(turtle_commands));
})

app.post('/sendcommand', function(req, res,next)
{
    let id = req.body.id
    let command = req.body.command

    res.send(command);

    if (!(id in turtle_commands))
    {
        turtle_commands[id] = {}
        turtle_commands[id]["queuedcommands"] = []
    }

    turtle_commands[id]["queuedcommands"].push(command);
})


app.listen(3000, function()
{
    console.log('listening on port 3000');
})