/**
 * Created by Wanting on 12/4/16.
 */


module.exports = function(){
    var mongoose = require("mongoose");
    var uri = "mongodb://stella:Jwt!19880906@ds129038.mlab.com:29038/mymovie";
    mongoose.connect(uri);
    //var connectionString = 'mongodb://127.0.0.1:27017/movieApp';
    //mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var friendModel = require("./friend/friend.model.server")();
    var reviewModel = require("./review/review.model.server")();

    var bcrypt = require("bcrypt-nodejs");
    /*var admin = {
        "username": "admin",
        "password": bcrypt.hashSync("admin"),
        "admin": true
    }*/

    var model = {
        userModel: userModel,
        reviewModel: reviewModel,
        friendModel: friendModel
    };

    //userModel.createUser(admin);
    return model;
};