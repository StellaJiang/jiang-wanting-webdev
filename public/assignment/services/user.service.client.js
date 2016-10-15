/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
        ];

        var service = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser: deleteUser
        };

        return service;

        function createUser(user) {
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == user.username) {
                    return null;
                }
            }
            var last_user_id = users[users.length - 1]._id + 1;
            last_user_id.toString();
            user["_id"] = last_user_id;
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i=0; i<users.length; i++){
                if(users[i].username == username && users[i].password==password){
                    return users[i];
                }
            }

            return null;
        }

        function updateUser(userId, user) {
            for(var i=0; i<users.length; i++){
                if(users[i]._id == userId){
                    users[i] = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            for(var i=0; i<users.length; i++){
                if(users[i]._id == userId){
                    users.splice(i, 1);
                    break;
                }
            }
        }
    }
})();