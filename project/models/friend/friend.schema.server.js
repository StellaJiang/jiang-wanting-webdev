/**
 * Created by Wanting on 12/7/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var friendSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        friendName: String,
        dateCreated: {type: Date, default: Date.now}
    },{collection: "friend"});

    return friendSchema;
};
