//app.js

const Express = require("express");
const { posix } = require("path");
const Http = require("http").Server(Express);
const Sio = require("socket.io")(Http);

var pos = {
    x: 200,
    y: 200
};

var app = Express();

app.get('/', (req, res) => {
    res.send('success')
})


Sio.on("connection", socket => {
    Sio.emit("position", pos);
});

Http.listen(3000, () => {
    console.log("listening at 3000")
});