/**
 * Created by Wanting on 12/4/16.
 */
(function() {
    "use strict";
    angular
        .module("MovieApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var service = {
            login: login,
            createUser : createUser,
            findUserById : findUserById,
            updateUser: updateUser,
            addFriend: addFriend,
            deleteFriend: deleteFriend,
            checkLogin: checkLogin,
            logout: logout,
            updatePassword: updatePassword,
            findAllUsers: findAllUsers,
            adminUpdatePassword: adminUpdatePassword
        };

        return service;

        function login(user){
            return $http.post('/api/login', user);
        }

        function createUser(user) {
            return $http.post('/api/user/', user);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user);
        }

        function addFriend(userId, fid){
            var url = '/api/user/' + userId + '/friend/' + fid;
            return $http.put(url);
        }

        function deleteFriend(userId, fid){
            var url = '/api/user/' + userId + '/friend/' + fid;
            return $http.post(url);
        }

        function checkLogin(){
            return $http.post('/api/checkLogin');
        }

        function logout() {
            return $http.post('/api/logout');
        }


        function updatePassword(userId, updated){
            var url = '/api/user/' + userId + '/password';
            return $http.put(url, updated);
        }

        function findAllUsers(){
            return $http.get('/api/users/all');
        }

        function adminUpdatePassword(userId, password){
            var url = '/api/admin/password/' + userId;
            return $http.put(url, password);
        }
    }
})();