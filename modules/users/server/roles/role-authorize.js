/**
 * Created by Dimitri Aguera on 28/08/2017.
 */
'use strict';

const _ = require('lodash');

module.exports = function (...authorizedRoles) {

    return function (req, res, next) {

        const userRoles = req.user.roles;

        if (!_.intersection(userRoles, authorizedRoles).length) {
            res.status(403);
            res.send('Not permitted with this role');
            return;
        }
        next();
    }
};