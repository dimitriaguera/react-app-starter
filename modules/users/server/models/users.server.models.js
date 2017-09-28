/**
 * Created by Dimitri Aguera on 28/08/2017.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const path = require('path');
const config = require(path.resolve('./config/env/config'));

const socketsEvents = require('../../../../config/sockets/sockets.conf');


/**
 * From MEAN JS.
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

const validateUsername = function (username) {
    const usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    return (username && usernameRegex.test(username) && config.security.illegalUsernames.indexOf(username) < 0);
};

/**
 * User model.
 *
 */
const UserSchema = new Schema ({

    username: {
        type: String,
        unique: true,
        required: true,
        validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.']
    },

    password: {
        type: String,
        required: true
    },

    roles: ['string'],

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    },
});


/**
 * Handle before saving to threat password.
 *
 */
UserSchema.pre('save', function (next) {
    const user = this;
    if ( this.isModified('password') || this.isNew ) {
        bcrypt.hash(user.password, null, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    } else {
        return next();
    }
});

/**
 * Handle for sockets.
 *
 */
UserSchema.post('save', function( doc ) {
    console.log('save post middleware called on User Model');
    socketsEvents.emit( 'save:user', doc );
});

/**
 * Handle save errors.
 *
 */
UserSchema.post('save', function( err, doc, next ) {

    if ( err.name === 'MongoError' && err.code === 11000 ) {
        next(new Error( `${doc.username} already exist. Please choose an other account name.`));
    }

    else {
        next( err );
    }
});

UserSchema.method('comparePassword', function(password){
    const self = this;
    return new Promise(function(resolve, reject) {
        bcrypt.compare( password, self.password,
            ( err, res ) => err ? reject(err) : resolve(res));
    });
});

UserSchema.method('secure', function(){
    const other = this.toObject();
    delete other.password;
    return other;
});

module.exports = mongoose.model('User', UserSchema);