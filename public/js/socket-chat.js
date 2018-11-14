var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        if (!params.has('privado')) {
            console.log(params.has('privado'));
            renderizarUsuarios(resp);
        }else{

            renderizarUsuariosPrivados(resp);
        }
    
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor:', mensaje);
    if (!params.has('privado')) {
        
        renderizarMensajes(mensaje, false);
    }else{
var c = 1;
        renderizarMensajesPrivados(mensaje, false, c);
    }
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    if (!params.has('privado')) {
        
        renderizarUsuarios(personas);
    }else{

        renderizarUsuariosPrivados(personas);
    }
    
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
      alerta(mensaje);
    console.log('Mensaje Privado:', mensaje);

});