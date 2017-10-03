/**
 * Created by Dimitri Aguera on 26/09/2017.
 */
const path = require('path');
const { ADMIN_ROLE, USER_ROLE, INVIT_ROLE } = require(path.resolve('./modules/users/commons/roles'));
const socketStrategy = require(path.resolve('./modules/users/server/config/socket.strategy'));
const chalk = require('chalk');

module.exports = function ( socketsEvents, io ) {

    // Create namespace.
    const nsp = io.of('/public');

    // Protect this namespace.
    //nsp.use( socketStrategy(ADMIN_ROLE) );

    // Apply messages.
    nsp.on( 'connection', messages );

    // Register events.
    socketsEvents.register( 'save:playlist', ( data ) => {
        console.log('post save playlist');
        nsp.emit( 'save:playlist', data );
    });

};

function messages( socket ) {
    // Socket connexion messages.
    console.log(chalk.blue(`CONNECTED to socket ${socket.id}`));
    // Socket disconnexion message.
    socket.on('disconnect', function(){
        console.log(chalk.blue(`DISCONNECTED to socket ${socket.id}`));
    });
}
