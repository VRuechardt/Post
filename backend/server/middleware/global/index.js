'use strict';

var passport = require('passport');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan');

module.exports = function(app){

    /*
     * add all express-middleware (e.g. bodyparser)
     */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'Awr5pruvANSPdsd324436435432rezu5We$r' }));
    //we dont want logging during tests
    if(process.env.NODE_ENV !== 'test'){
        app.use(morgan('dev'));
    }

    /*
     * initialize passport
     */
    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(app, passport);
    
};