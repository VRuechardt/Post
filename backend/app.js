/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express');
var logger = require('winston');

// Setup server
var app = express();

require('./routes')(app);

var server = require('http').createServer(app);

// Start server
server.listen(80, undefined, function(){
    logger.log('info', 'Server listing on %d, in %s mode', 80, app.get('env'));
});
server.on('error', onError);

function onError(error) {
    logger.log('info','Server Error', error);
}

// Expose app
module.exports = app;
