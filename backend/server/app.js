/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express'),
    app = express();

var logger = require('winston');
var initDB = require('./config/database.js');
var http = require('http');

require('./middleware/global')(app);
require('./api')(app);
app.use(require('./middleware/global/errorhandler'));
require('./middleware/global/static')(app);


initDB().then(function(){

    var server = require('http').createServer(app);

    server.listen(80, undefined, function(){
        logger.log('info', 'Server listening on %d, in %s mode', 80, app.get('env'));
    });

    server.on('error', function(error) {
        logger.log('info','Server Error', error);
    });
});

//expose app
module.exports = app;