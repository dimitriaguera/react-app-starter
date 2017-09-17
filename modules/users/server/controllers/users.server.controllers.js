/**
 * Created by Dimitri Aguera on 28/08/2017.
 */
'use strict';

const User = require('../models/users.server.models');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const path = require('path');
const config = require(path.resolve('./config/env/local-config'));
const _ = require('lodash');

exports.login = function (req, res) {

    const { username, password } = req.body;

    Promise.coroutine( function*() {

         const user = yield User.findOne( {name: username} );
         if ( !user ) {
             res.json({
                 success: false,
                 msg: 'Authentication failed'
             });
         }

         const isValidPwd = yield user.comparePassword(password);
         if ( isValidPwd ) {

             const secureUser = user.secure();
             const token = jwt.encode( secureUser, config.security.jwtSecret );

             res.json({
                 success: true,
                 msg: Object.assign(secureUser, {token: `BEARER ${token}`})
             });

         } else {
             res.json({
                 success: false,
                 msg: 'Authentication failed. Wrong User or Password.'
             });
         }
    })().catch( err => console.log(err) );
};


exports.register = function (req, res) {

    const {username, password, roles} = req.body;

    if ( !username || !password ) {
        res.json({
            success: false,
            msg: 'Please pass name and password.'
        });
    } else {

        const newUser = new User({
            name: username,
            password: password,
            roles: roles,
        });

        newUser.save(function(err) {
            if (err) {
                return res.json({
                    success: false,
                    msg: `Account name "${newUser.name}" already exists.`
                });
            }
            res.json({
                success: true,
                msg: 'Successful created new user.'
            });
        });
    }
};

exports.users = function(req, res) {

    User.find({}, '-password').exec(function(err, users){
        if (err) {
            return res.status(422).json({
                success: false, msg: err.name
            });
        }
        res.json({
            success: true,
            msg: users
        });
    });
};

exports.user = function(req, res) {

    const user = req.model;

    if (!user) {
        return res.status(401).json({
            success: false,
            msg: 'User no found'});
    }
    res.json({
        success: true,
        msg: user
    });
};

exports.account = function(req, res) {

    const user = req.user;

    if ( !user ){
        return res.status(401).json({
            success: false,
            msg: 'Account not found'
        });
    }
    res.json({
        success: true,
        msg: user.secure()
    });
};

exports.update = function(req, res) {

    const user = req.model;

    // Here specify fields to update.
    if ( req.body.roles ) user.roles = req.body.roles;

    user.save( function(err){
        if (err) {
            return res.status(422).json({
                success: false,
                msg: err
            });
        }
        res.json({
            success: true,
            msg: user
        });
    });
};

exports.delete = function(req, res) {

    const user = req.model;

    user.remove(function(err){
        if (err) {
            return res.status(422).json({
                success: false,
                msg: err
            });
        }
        res.json({
            success: true,
            msg: user
        });
    });
};

exports.userByName = function(req, res, next, name) {

    // if ( !mongoose.Types.ObjectId.isValid(id) ) {
    //     return res.status(400).json({
    //         success: false, msg:'Not valid user'
    //     });
    // }

    User.findOne({name:name}, '-password').exec(function(err, user){
        if ( err ) {
            return next( err );
        }
        // else if ( !user ) {
        //     return next( new Error(`Fail to search user with Name ${name}`) );
        // }
        req.model = user;
        next();
    });
};