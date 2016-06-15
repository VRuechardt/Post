'use strict';

exports.returnOKandUserJson = function(req, res) {
    var user = req.user.to_dict();
    return res.status(200).json(user);
};

exports.returnCreatedAndUserJson = function(req, res) {
    var user = req.user.to_dict();
    return res.status(201).json(user);
};

exports.logout = function(req, res) {
    req.logout();
    return res.sendStatus(200);
};