'use strict';

var path = require('path');
var _ = require('lodash');

console.log(process.env.NODE_ENV);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV !== 'development') {
    if(process.env.NODE_ENV === 'test'){
        console.log('RUNNING ON TEST DATABASE');
    } else {
        console.log('RUNNING IN PRODUCTION ON LIVE DATABASE');
    }
}


var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Url of the server
    url: 'http://localhost',

    // Server port
    port: process.env.PORT || 80,

    designer_registration_code: "aJ4+Nubre+5f3Ew!esUGbaF6Ses@!ru8E"
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./env/' + process.env.NODE_ENV + '.js') || {});