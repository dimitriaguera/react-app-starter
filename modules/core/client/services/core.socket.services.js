/**
 * Created by Dimitri Aguera on 21/09/2017.
 */
import io from 'socket.io-client'
import { host, protocol, port } from 'env/config'
import { getLocalToken } from 'users/client/services/users.storage.services'

const url = `${protocol}://${host}:${port}/`;

const socketService = {

    getPrivateSocket: function( namespace, path ) {

        const nsp = namespace || 'private';
        const options = {
            path: path || '',
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': getLocalToken(),
                    }
                }
            }
        };

        // Try to connect.
        const socket = io.connect( url + nsp, options );

        // Catch error send by server.
        socket.on('error', function(err) {
            console.log('Server socket sent an error : ', err);
        });


        return socket;
    },

    getPublicSocket: function() {
        return io.connect( url );
    }
};

export default socketService;