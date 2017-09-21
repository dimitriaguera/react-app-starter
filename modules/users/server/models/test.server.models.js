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
const TestSchema = new Schema ({

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



module.exports = mongoose.model('Test', TestSchema);