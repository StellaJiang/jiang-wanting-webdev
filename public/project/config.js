/**
 * Created by Wanting on 12/4/16.
 */

(function() {
    "use strict";
    angular
        .module("MovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/login.view.client.html',
                controller:'LoginController',
                controllerAs:'model'
            })
            .when('/login', {
                templateUrl: 'views/user/login.view.client.html',
                controller:'LoginController',
                controllerAs:'model'
            })
            .when('/register', {
                templateUrl: 'views/user/register.view.client.html',
                controller:'RegisterController',
                controllerAs:'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/profile.view.client.html',
                controller:'ProfileController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid', {
                templateUrl: 'views/user/profile.view.client.html',
                controller:'ProfileController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/password', {
                templateUrl: 'views/user/user-password.view.client.html',
                controller:'UserPasswordController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/following', {
                templateUrl: 'views/friends/following-list.view.client.html',
                controller:'FollowingListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/follower', {
                templateUrl: 'views/friends/follower-list.view.client.html',
                controller:'FollowerListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/friend/:fid', {
                templateUrl: 'views/friends/friend-review.view.client.html',
                controller:'FriendReviewController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/friend/:fid/movie/:mid', {
                templateUrl: 'views/friends/friend-review-detail.view.client.html',
                controller:'FriendReviewDetailController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/movie', {
                templateUrl: 'views/movies/movie-list.view.client.html',
                controller:'MovieListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/movie/:title', {
                templateUrl: 'views/movies/movie-list.view.client.html',
                controller:'MovieListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/movie/:title/:mid', {
                templateUrl: 'views/movies/movie-detail.view.client.html',
                controller:'MovieDetailController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/review', {
                templateUrl: 'views/reviews/review-list.view.client.html',
                controller:'ReviewListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/admin/:uid/review', {
                templateUrl: 'views/reviews/admin-review-list.view.client.html',
                controller:'AdminReviewListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/admin/:aid/user', {
                templateUrl: 'views/user/admin-user-list.view.client.html',
                controller:'AdminUserListController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/admin/:aid/user/:uid', {
                templateUrl: 'views/user/admin-user-detail.view.client.html',
                controller:'AdminUserDetailController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/admin/:aid/user/:uid/password', {
                templateUrl: 'views/user/admin-change-password.view.client.html',
                controller:'AdminChangePasswordController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when('/user/:uid/review/:rid', {
                templateUrl: 'views/reviews/review-edit.view.client.html',
                controller:'ReviewEditController',
                controllerAs:'model',
                resolve: {
                    checkLogin: checkLogin
                }
            });
    }

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
})();

