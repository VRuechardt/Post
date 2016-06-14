/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

angular.module('post.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', require('./home.controller'));