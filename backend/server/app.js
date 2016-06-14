/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express'),
    app = express();
var logger = require('winston');

var models = require('./models');

var path = require('path');
var compression = require('compression');

require('./middleware/global')(app);
require('./api')(app);


/*
 *  serving all frontend correctly
 */

app.use(compression({filter: function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}}));

// serve static content
app.use('/',express.static(path.normalize(path.join(__dirname, '/../../frontend/dest'))));

// otherwise serve index file (important for angular HTML5 mode)
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: path.normalize(path.join(__dirname, '/../../frontend/dest/')) });
});


var server = require('http').createServer(app);

app.use(require('./middleware/global/errorhandler'));
models.sequelize.sync({force: true}).then(function(){
    server.listen(80, undefined, function(){
        logger.log('info', 'Server listening on %d, in %s mode', 80, app.get('env'));
    });

    server.on('error', function(error) {
        logger.log('info','Server Error', error);
    });
});

// Expose app
module.exports = app;
