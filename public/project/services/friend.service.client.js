/**
 * Created by Wanting on 12/7/16.
 */

(function() {
    "use strict";
    angular
        .module("MovieApp")
        .factory("FriendService", FriendService);

    function FriendService($http){
        var service = {
            addFriend: addFriend,
            findFollowingById: findFollowingById,
            findFollowerById: findFollowerById,
            deleteFriend: deleteFriend
        };

        return service;

        function addFriend(relation){
            return $http.post('/api/friend', relation);
        }

        function findFollowingById(uid){
            return $http.get('/api/user/' + uid + '/following');
        }

        function findFollowerById(uid){
            return $http.get('/api/user/' + uid + '/follower');
        }

        function deleteFriend(relationId){
            var url = '/api/friend/' + relationId;
            return $http.delete(url);
        }
    }
})();