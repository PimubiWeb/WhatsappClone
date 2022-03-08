$(function() {

    const socket = io(); //conexion web socket

    // obtener elementos del DOM de mi html

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    
    // eventos
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');
    })

    socket.on('new message', function(data) {
        $chat.append(data + '<br/>');
    })

});