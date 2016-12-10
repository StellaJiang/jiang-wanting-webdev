/**
 * Created by Wanting on 12/7/16.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("FollowingListController", FollowingListController)
        .controller("FollowerListController", FollowerListController)
        .controller("FriendReviewController", FriendReviewController)
        .controller("FriendReviewDetailController", FriendReviewDetailController);

    function FollowingListController($location, $routeParams, $scope, FriendService, UserService, $route) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.deleteFriend = deleteFriend;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            FriendService
                .findFollowingById(userId)
                .success(function(friends){
                    vm.friends = friends;
                })
        }

        init();

        function deleteFriend(relationId, friendId){
            FriendService
                .deleteFriend(relationId)
                .success(function(status){})
                .catch(function (error) {
                    console.log("error from friend");
                });

            UserService
                .deleteFriend(userId, friendId)
                .success(function (status) {
                    $route.reload();
                })
                .catch(function (error) {
                    console.log("error from friend");
                });
        }

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }

    function FollowerListController($location, $routeParams, $scope, FriendService, UserService, $route) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.addFriend = addFriend;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                        vm.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from friend");
                });

            FriendService
                .findFollowerById(userId)
                .success(function(friends){
                    vm.friends = friends;
                })
        }

        init();

        function addFriend(fid, friendName){
            var relation = {
                _user: userId,
                username: $scope.user.username,
                friendId: fid,
                friendName: friendName
            }
            FriendService
                .addFriend(relation)
                .success(
                    function(relation){
                        if(relation){
                            UserService
                                .addFriend(userId, relation.friendId)
                                .success(function(result){
                                    $route.reload();
                                })
                        }
                    }
                )
                .catch(function (error) {
                    console.log("error from friend");
                });
        }

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }

    function FriendReviewController($location, $routeParams, $scope, UserService, ReviewService){
        var vm = this;
        var userId = $routeParams.uid;
        var friendId = $routeParams.fid;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            UserService
                .findUserById(friendId)
                .success(function (friend) {
                    $scope.friend = friend;
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            ReviewService
                .findReviewByUserId(friendId)
                .success(function(reviews){
                    if(reviews != 0){
                        vm.reviews = reviews;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }


    function FriendReviewDetailController($location, $routeParams, $scope, $route,
                                          UserService, $http, ReviewService, FriendService) {
        var vm = this;
        var userId = $routeParams.uid;
        var friendId = $routeParams.fid;
        var movieId = $routeParams.mid;
        vm.addFriend = addFriend;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            UserService
                .findUserById(friendId)
                .success(function (friend) {
                    $scope.friend = friend;
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";
            $http
                .get(url)
                .success(function(result){
                    vm.movie = result;
                });

            console.log(vm.movie);
            ReviewService
                .findReviewByMovieId(movieId)
                .success(function (reviews) {
                    vm.reviews = reviews;
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }
        init();

        function addFriend(fid, friendName){
            var relation = {
                _user: userId,
                username: $scope.user.username,
                friendId: fid,
                friendName: friendName
            }
            FriendService
                .addFriend(relation)
                .success(
                    function(relation){
                        if(relation){
                            UserService
                                .addFriend(userId, relation.friendId)
                                .success(function(result){
                                    $route.reload();
                                })
                        }
                    }
                );
        }

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }
})();