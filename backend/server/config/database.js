'use strict';
var promise;
var models = require('../models');

module.exports = function(){
    if(process.env.NODE_ENV === 'test'){
        return promise = models.sequelize.sync({force: true});
    } else {
        return promise = models.sequelize.sync();
    }
};