
module.exports = function (io) {

    io.on('connection', socket => {
        console.log('new user coneccted');


        socket.on('send message', function(data) { //recoge los mensajes
            io.sockets.emit('new message', data); //devuelve el servidor los mensajes
            
        })
    });

}