// requires
const http = require('http'); 
const express = require('express');
const socketio = require('socket.io');
const path = require('path'); //agrega la ruta exacta para acceder directorios desde w10 o linux

// mounting the server
const app = express(); // create an Express aplication
const server = http.createServer(app);
const io = socketio(server);

// settings
app.set('port', process.env.PORT || 3000) //configurar puerto (si el servidor me da un puerto lo coge sino coge el 3000)

// modularizar codigo para ser mas escalable
require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'));
});