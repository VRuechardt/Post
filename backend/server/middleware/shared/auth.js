'use strict';

exports.isUserLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    return res.sendStatus(401);
};