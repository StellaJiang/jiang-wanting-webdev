/**
 * Created by Wanting on 12/6/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var reviewSchema = require("./review.schema.server")();
    var reviewModel = mongoose.model("reviewModel", reviewSchema);

    var api = {
        findReviewByMovieId: findReviewByMovieId,
        addReview: addReview,
        findReviewByUserId: findReviewByUserId,
        findReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview,
        getAllReviews: getAllReviews
    };
    return api;

    function findReviewByMovieId(mid){
        return reviewModel.find({
            movieId: mid
        });
    }

    function addReview(myReview){
        return reviewModel.create(myReview);
    }

    function findReviewByUserId(uid){
        return reviewModel.find({
            _user: uid
        });
    }

    function findReviewById(rid){
        return reviewModel.findOne({
            _id: rid
        });
    }

    function updateReview(rid, review){
        return reviewModel
            .update(
                {
                    _id: rid
                },
                {
                    review: review
                }
            );
    }

    function deleteReview(rid){
        return reviewModel
            .remove({
                _id: rid
            })
    }

    function getAllReviews(){
        return reviewModel.find();
    }
};