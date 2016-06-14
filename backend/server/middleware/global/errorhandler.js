'use strict';

var logger = require('winston');

module.exports = function(err, req, res, next){
    logger.log('uhuhuhu');
    switch(err.message){
        case 'Invalid Parameters':
            return res.sendStatus(400);
        case 'authenticationError':
            return res.sendStatus(401);
        default:
            logger.log('Error', 'Server Error: ', err);
    }
};