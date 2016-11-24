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
            login: login,
            createUser : createUser,
            register: register,
            findUserById : findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser: deleteUser,
            checkLogin: checkLogin,
            logout: logout
        };

        return service;

        function checkLogin(){
            return $http.post('/api/checkLogin');
        }

        function login(user){
            return $http.post('/api/login', user);
        }

        function createUser(user) {
            return $http.post('/api/user/', user);
        }

        function register(user) {
            return $http.post('/api/register', user);
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
        
        function logout() {
            return $http.post('/api/logout');
        }
    }
})();