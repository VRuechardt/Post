'use strict';


var path = require('path');
var compression = require('compression');
var express = require('express');

module.exports = function(app){
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
    app.use('/',express.static(path.normalize(path.join(__dirname, '/../../../../frontend/dest'))));

// otherwise serve index file (important for angular HTML5 mode)
    app.all("/*", function(req, res, next) {
        res.sendFile("index.html", { root: path.normalize(path.join(__dirname, '/../../../../frontend/dest/')) });
    });
};