/**
 * Created by Dimitri Aguera on 30/09/2017.
 */

const music = require('../controllers/music.server.controllers.js');

module.exports = function(app){

    // Return index file.
    app.route('/api/music/read').get(music.read);

};
