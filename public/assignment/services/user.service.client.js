/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http){
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
            return $http.post('/api/user/', user);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url);
        }
    }
})();