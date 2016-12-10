/**
 * Created by Wanting on 12/4/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("userModel", userSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        updateFriend: updateFriend,
        updatePassword: updatePassword,
        findFacebookUser: findFacebookUser,
        getAllUsers: getAllUsers
    };
    return api;

    function findFacebookUser(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});

    }

    function createUser (user) {
        return userModel.create(user);
    }

    function findUserByUsername(username){
        return userModel.findOne({
            username: username
        });
    }

    function findUserByCredentials(username, password){
        return userModel.findOne({
            username: username,
            password: password
        });
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function updateUser(userId, user) {
        return userModel
            .update(
                {
                    _id: userId
                },
                {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            );
    }

    function updateFriend(uid, friends){
        return userModel
            .update(
                {
                    _id: uid
                },
                {
                    following: friends
                }
            );
    }

    function updatePassword(uid, password) {
        return userModel
            .update(
                {
                    _id: uid
                },
                {
                    password: password
                }
            );
    }

    function getAllUsers(){
        return userModel.find();
    }
};