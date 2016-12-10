/**
 * Created by Wanting on 12/6/16.
 */

(function() {
    "use strict";
    angular
        .module("MovieApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var service = {
            findReviewByMovieId: findReviewByMovieId,
            addReview: addReview,
            findReviewByUserId: findReviewByUserId,
            findReviewById: findReviewById,
            updateReview: updateReview,
            deleteReview: deleteReview,
            findReviews: findReviews
        };

        return service;

        function findReviewByMovieId(mid){
            var url = '/api/review/' + mid;
            return $http.get(url);
        }

        function addReview(review, userId, username, movieId, moviename){
            var myReview = {
                review: review,
                _user: userId,
                username: username,
                movieId: movieId,
                movieName: moviename
            }

            return $http.post('/api/review/', myReview);
        }

        function findReviewByUserId(uid){
            return $http.get('/api/review/list/' + uid);
        }

        function findReviewById(rid){
            var url = '/api/review/detail/' + rid;
            return $http.get(url);
        }

        function updateReview(rid, review){
            var myReview = {
                review: review
            }
            return $http.post('/api/review/update/' + rid, myReview);
        }

        function deleteReview(rid){
            var url = '/api/review/' + rid;
            return $http.delete(url);
        }

        function findReviews(){
            var url = '/api/review/all';
            return $http.get(url);
        }
    }
})();