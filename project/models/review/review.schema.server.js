/**
 * Created by Wanting on 12/6/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var reviewSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        movieId: String,
        movieName: String,
        review: String,
        dateCreated: {type: Date, default: Date.now}
    },{collection: "review"});

    return reviewSchema;
};