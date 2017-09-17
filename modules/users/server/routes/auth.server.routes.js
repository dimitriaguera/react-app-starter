/**
 * Created by Dimitri Aguera on 28/08/2017.
 */

'use strict';

const passport = require('passport');
const authorizeRoles = require('../roles/role-authorize');
const { ADMIN_ROLE } = require('../../commons/roles');

module.exports = function (app) {

    const users = require('../controllers/users.server.controllers');

    // Login api
    app.route('/api/login').post( users.login );

    // Register api
    app.route('/api/register').post( users.register );

    // Account
    app.route('/api/account').all(passport.authenticate('jwt', { session: false }))
        .get( users.account );

    // Users list
    app.route('/api/users').all(passport.authenticate('jwt', { session: false }), authorizeRoles(ADMIN_ROLE))
        .get( users.users );

    // Unique user
    app.route('/api/users/:userName').all(passport.authenticate('jwt', { session: false }), authorizeRoles(ADMIN_ROLE))
        .get( users.user )
        .put( users.update )
        .delete( users.delete );

    app.param('userName', users.userByName);
};
