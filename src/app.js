//app.js

const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const sio = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, '../public')));

//start server



const connections = [];


sio.on('connection', socket => {

    console.log('A user has connected');
    socket.on('ready', () => {
        connections.push(true);
        const number = connections.length();
        socket.emit('player-number', number);
    });
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    })
});

server.listen(3000, () => {
    console.log('listening on port 3000')
});







