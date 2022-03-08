
module.exports = function (io) {

    let nicknames = [
        'pablo',
        'jose',
        'fer',
        'rut'
    ];

    io.on('connection', socket => {
        console.log('new user conected');
        
        //socket recoge evento new user del main.js
        socket.on('new user', (data, callback) => {
            console.log(data)

            //si no esta en el array el indice sera -1, por lo tanto, si exite el usuario vale n y sino -1
            if(nicknames.indexOf(data) !=-1) {
                callback(false);
            }else{
                callback(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);

            }
        });

        //socket recoge evento send mensage del main.js
        socket.on('send message', function(data) { //data sera el valor pasado por $messageBox.val() del main.js
            io.sockets.emit('new message', data);
        });
    });

}