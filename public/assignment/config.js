/**
 * Created by Wanting on 10/10/16.
 */

(function() {
    "use strict";
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/login.view.client.html',
                controller:'LoginController',
                controllerAs:'login'
            })
            .when('/login', {
                templateUrl: 'views/user/login.view.client.html',
                controller:'LoginController',
                controllerAs:'login'
            })
            .when('default', {
                templateUrl: 'views/user/login.view.client.html',
                controller:'LoginController',
                controllerAs:'login'
            })
            .when('/register', {
                templateUrl: 'views/user/register.view.client.html',
                controller:'RegisterController',
                controllerAs:'register'
            })
            .when('/user/:uid', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .when('/user/:uid/website', {
                templateUrl: 'views/website/website-list.view.client.html'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'views/website/website-new.view.client.html'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'views/website/website-edit.view.client.html'
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'views/page/page-list.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'views/page/page-new.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'views/page/page-edit.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/widget-list.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/widget-chooser.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/widget-edit.view.client.html'
            });
    }
})();

