// Acquire Modules -- Express and Sockets
var express = require('express');
var socket = require('socket.io')

// App Setup -- Telling Express to listen on Port 4000. "app" is an Express variable.
var app = express();
var server = app.listen(4000, function(){
    console.log("Listening on port 4000");
});

// Static Files -- Looks for this folder to serve the website
app.use(express.static('public'));



// Socket Setup -- Tell Socket.io to listen to this server
var io = socket(server);

// Handle Chat Event -- Listens for event called "connection"
io.on('connection', (socket) => {
    // Socket ID is a unique code for each connected user assigned upon connecting
    console.log('made socket connection',socket.id);


    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit("typing", data);
    });
});