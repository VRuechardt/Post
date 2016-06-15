'use strict';

var logger = require('winston');

module.exports = function(err, req, res, next){
    switch(err.message){
        case 'Invalid Parameters':
            return res.sendStatus(400);
        case 'authenticationError':
            return res.sendStatus(401);
        default:
            throw err;
    }
};