var express = require('express');
var socket = require('socket.io')

// App Setup
var app = express();
var server = app.listen(4000, function(){
    console.log("Listening on port 4000");
});

// Static Files
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection',socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
});