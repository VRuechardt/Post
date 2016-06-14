/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

var express = require('express');

module.exports = function(app) {
    var router = express.Router();

    router.use('/auth', require('./auth'));

    app.use('/api', router);
};