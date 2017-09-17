/**
 * Created by Dimitri Aguera on 28/08/2017.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
//const conf = require('../../../../config/env/local-config');

// User model.
const UserSchema = new Schema ({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: ['string'],
});

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