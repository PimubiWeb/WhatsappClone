$(function() {

    const socket = io(); //conexion web socket

    // obtener elementos del DOM de mi sala de chat

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    
    // obtener elementos del DOM de mi login de usuario
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');
    // const $nickstatus = $('#nickstatus');
    // const $nickavatar = $('#nickavatar');

    // obteniendo la lista de usuarios
    const $users = $('#usernames');

    // evento de registrar un nuevo usuario
    $nickForm.submit( e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            if(data) {
                $('#loginChat').hide();
                $('#contentChat').show();
            }else {
                $nickError.html(`
                    <div class="alert alert-danger">
                        Username already exits.
                    </div>
                `);
            }
            $nickname.val('');
        });
    })

    // evento de enviar un mensaje siendo ya un usuario
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');
    })

    //new message es el evento enviado desde socket.js que envia la data, es decir, el mensaje que envia un usuario
    socket.on('new message', function(data) {
        $chat.append('<b>' + data.nick + ' </b>: '+ data.msg + '<br/>'); //metemos en la sala del chat
    })

    //socket envia la lista de usuarios
    socket.on('usernames', data => {
        let html = '';
        for(let i = 0; i< data.length; i++){
            html += `<p> <i class='bx bxs-user'></i> ${data[i]}</p>` 
        }
        $users.html(html);
    });

});