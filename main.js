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
var master_relay = []
var turtle_counter = 1

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/turtle', function(req, res, next)
{
    let id = req.body.id;
    let t = req.body.t;

    if (!(id in turtle_commands))
    {
        turtle_commands[id] = {};
        turtle_commands[id]["queuedcommands"] = [];
    }

    if (t == 1)
    {
        turtle_commands[id]["info"] = {
            x : req.body.x,
            y : req.body.y,
            z : req.body.z,
            t : Date.now()
        };
    
        res.send(JSON.stringify(turtle_commands[id]["queuedcommands"]));
        turtle_commands[id]["queuedcommands"] = []
    }
    else if (t == 2)
    {
        res.send(String(turtle_counter));
        turtle_counter = turtle_counter + 1
    }
    else if (t == 3)
    {
        master_relay.push(req.body.info);
        res.send("");
    }
    else if (t == 4)
    {
        res.send(JSON.stringify(master_relay));
        master_relay = []
    }
    else 
    {
        let command = req.body.command;
        turtle_commands[id]["queuedcommands"].push(command);
        res.send("Sent :)")
    }

})

app.post('/master', function(req, res,next)
{
    res.send(JSON.stringify(turtle_commands));
})


app.listen(3000, function()
{
    console.log('listening on port 3000');
})