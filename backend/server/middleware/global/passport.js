'use strict';

var models = require('../../models');
var LocalStrategy = require('passport-local').Strategy;
var assertions = require('../../utils/assertions');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done){
        return models.User.findAll({
            where: {id: userId}
        }).then(function(users){
            if(users.length === 1){
                done(null, users);
            } else {
                throw new Error('user with id %d does not exist', userId);
            }
        });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done){
        var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return models.User.create({
            email: email,
            password: passwordHash,
            admin: false
        }).then(function(newUser){
            return done(null, newUser);
        }).catch(function(err){
            done(new Error('Invalid Parameters'));
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done){
        return models.User.findAll({
            email: email
        }).then(function(users){
            if(users.length === 1){
                if(bcrypt.compareSync(password, users[0].password)) return done(null, users);
                done(new Error('authenticationError'));
            } else {
                done(new Error('authenticationError'));
            }
        });
    }));
};
