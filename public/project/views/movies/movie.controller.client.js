/**
 * Created by Wanting on 12/5/16.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("MovieListController", MovieListController)
        .controller("MovieDetailController", MovieDetailController);

    function MovieListController($location, $routeParams, $scope, UserService, $http){
        var vm = this;

        var userId = $routeParams.uid;
        vm.searchMovieByTitle = searchMovieByTitle;
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

            var title = $routeParams.title;
            if(title) {
                var url = "http://www.omdbapi.com/?s=" + title;
                $http
                    .get(url)
                    .success(function (result) {
                        vm.movies = result.Search;
                        vm.search = title;
                    });
            }
        }

        init();

        function searchMovieByTitle(title) {
            vm.search = title;
            var url = "http://www.omdbapi.com/?s=" + title;
            $http
                .get(url)
                .success(function(result){
                    var totalResult = result.totalResults;
                    var num = totalResult / 10 + 1;
                    vm.movies = result.Search;
                    for(var i = 2; i <= num; i++) {
                        var tempUrl = "http://www.omdbapi.com/?s=" + title + "&page=" + i;
                        $http
                            .get(tempUrl)
                            .success(function(currResult){
                                vm.movies = vm.movies.concat(currResult.Search);
                            })
                    }
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

    function MovieDetailController($location, $routeParams, $route, $scope,
                                   UserService, ReviewService, FriendService, $http) {
        var vm = this;

        var userId = $routeParams.uid;
        var movieId = $routeParams.mid;
        vm.search = $routeParams.title;
        vm.writeReview = writeReview;
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

            var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";
            $http
                .get(url)
                .success(function(result){
                    vm.movie = result;
                });

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

        function writeReview(review){
            ReviewService
                .addReview(review, userId, $scope.user.username, movieId, vm.movie.Title)
                .success(function(result) {
                    $route.reload();
                });
        }

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