module.exports = function (io) {

    //lista de usuarios, hace la simulacion de mi base de datos
    let nicknames = [
        'pablo',
        'german',
        'fer',
        'rut'
    ];

    let status = [
        'dormido'
    ]

    io.on('connection', socket => {
        console.log('new user conected');
        
        //socket recoge evento new user del main.js
        socket.on('new user', (data, callback) => {
            // console.log(data)

            //si no esta en el array el indice sera -1, por lo tanto, si exite el usuario vale n y sino -1
            if(nicknames.indexOf(data) !=-1) {
                callback(false);
            }else{
                callback(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                //emit que envia la lista usuarios
                io.sockets.emit('usernames', nicknames);

            }
        });

        //socket recoge evento send mensage del main.js
        socket.on('send message', function(data) { //data sera el valor pasado por $messageBox.val() del main.js
            io.sockets.emit('new message', data);
        });
    });

}