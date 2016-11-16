/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("userModel", userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser
    };
    return api;

    function createUser (user) {
        return userModel.create(user);
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

    function findUserByCredentials(username, password){
        return userModel.findOne({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username){
        return userModel.find({
            username: username
        });
    }

    function deleteUser(userId){
        return userModel
            .remove({
                _id: userId
            })
    }
};