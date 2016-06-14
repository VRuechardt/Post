'use strict';

var passport = require('passport');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function(app){

    /*
     * add all express-middleware (e.g. bodyparser)
     */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'Awr5pruvANSPdsd324436435432rezu5We$r' }));


    /*
     * initialize passport
     */
    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(app, passport);

};