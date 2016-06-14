'use strict';

exports.isUserLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    throw new Error('authenticationError');
};