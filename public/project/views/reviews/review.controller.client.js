/**
 * Created by Wanting on 12/7/16.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("ReviewListController", ReviewListController)
        .controller("ReviewEditController", ReviewEditController)
        .controller("AdminReviewListController", AdminReviewListController);

    function ReviewListController($location, $routeParams, $scope, $route, UserService, ReviewService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.deleteReview = deleteReview;
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

            ReviewService
                .findReviewByUserId(userId)
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

        function deleteReview(rid){
            ReviewService
                .deleteReview(rid)
                .success(function(result){
                    $route.reload();
                })
                .catch(function (error) {
                    console.log("error from profile");
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

    function ReviewEditController($location, $routeParams, $scope, UserService, ReviewService, $http){
        var vm = this;
        var userId = $routeParams.uid;
        var reviewId = $routeParams.rid;
        vm.updateReview = updateReview;
        vm.logout = logout;

        function init(){
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

            ReviewService
                .findReviewById(reviewId)
                .success(function(review){
                    if(review != 0){
                        vm.review = review;
                        var url = "https://www.omdbapi.com/?i=" + vm.review.movieId + "&plot=full";
                        $http
                            .get(url)
                            .success(function(result){
                                vm.movie = result;
                            });
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function updateReview() {
            ReviewService
                .updateReview(reviewId, vm.review.review)
                .success(function(review){
                    $location.url("/user/" + userId + "/review");
                })
                .catch(function (error) {
                    console.log("error from profile");
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

    function AdminReviewListController($location, $routeParams, $scope, $route, UserService, ReviewService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.deleteReview = deleteReview;
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

            ReviewService
                .findReviews()
                .success(function (reviews) {
                    if (reviews != '0') {
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

        function deleteReview(rid){
            ReviewService
                .deleteReview(rid)
                .success(function(result){
                    $route.reload();
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }
    }
})();
