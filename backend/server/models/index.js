'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'production';
var config    = require('../config');
var db        = {};

var opts = {
    dialect: 'mysql',
    dialectOptions:
    {
        supportBigNumbers: true
    }

};
//we dont want logging during tests
if(process.env.NODE_ENV === 'test') opts.logging = false;


var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, opts);

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
