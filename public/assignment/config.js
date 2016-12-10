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
            .when('/profile', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website', {
                templateUrl: 'views/website/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'websiteList',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'views/website/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'newWebsite',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'views/website/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'editWebsite',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'views/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'pageList',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'views/page/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'newPage',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'editPage',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'widgetList',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'newWidget',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'editWidget',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/flicker', {
                templateUrl: 'views/widget/widget-flickr-search.view.client.html',
                controller:'FlickrController',
                controllerAs:'flicker',
                resolve: {
                    checkLogin: checkLogin
                }
            });

        function checkLogin($q, UserService, $location, $rootScope){
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function(user){
                        if(user != '0'){
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url('/login');
                        }
                    }
                );
            return deferred.promise;
        }
    }
})();

