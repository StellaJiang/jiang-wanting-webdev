/**
 * Created by Wanting on 12/4/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id:    String,
            token: String,
            displayName: String
        },
        email: String,
        admin: Boolean,
        following: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now}
    },{collection: "user"});

    return userSchema;
};