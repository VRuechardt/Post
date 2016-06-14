/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express');
var logger = require('winston');
var compression = require('compression')

// Setup server
var app = express();

require('./routes')(app);

app.use(compression({filter: function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}}));

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
