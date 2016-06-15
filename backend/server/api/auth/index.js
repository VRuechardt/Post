'use strict';

var express = require('express'),
    router = express.Router();
var authUtil = require('../../middleware/shared/auth'),
    passport = require('passport');
var authController = require('./auth.controller');

router.post('/register', passport.authenticate('local-register'), authController.returnCreatedAndUserJson);
router.post('/login', passport.authenticate('local-register'), authController.returnOKandUserJson);
router.get('/check_login', authUtil.isUserLoggedIn, authController.returnOKandUserJson);
router.get('/logout', authUtil.isUserLoggedIn, authController.logout);

module.exports = router;