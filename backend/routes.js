/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express');
var path = require('path');

module.exports = function(app) {

    // serve static content
    app.use('/',express.static(path.normalize(path.join(__dirname, '../frontend/dest'))));

    // otherwise serve index file (important for angular HTML5 mode)
    app.all("/*", function(req, res, next) {
        res.sendFile("index.html", { root: path.normalize(path.join(__dirname, '../frontend/dest/')) });
    });

};