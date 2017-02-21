var express = require('express');
var path = require('path');
var http = require("http");
var ejs = require('ejs');

var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'public/views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
    res.sendStatus(404);
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
        console.log("ONLINE");
    socket.on('disconnect', function () {
        console.log("OVER");
    });
    socket.on('message', function (msg) {
        socket.broadcast.emit('DATA', msg);     //向客户端发送消息
    });
    socket.on('error', function (err) {
        console.log(err);
    });
});
server.listen(3000);

module.exports = app;
