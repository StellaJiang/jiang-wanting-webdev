/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var webSchema = require("../website/website.schema.server.js")(mongoose);

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [webSchema],
        dateCreated: {type: Date, default: Date.now}
    },{collection: "user"});

    return userSchema;
};