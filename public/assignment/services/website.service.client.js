/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http){
        var service = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };

        return service;

        function createWebsite(uid, website){
            var url = '/api/user/' + uid + '/website';
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId){
            var url = '/api/user/' + userId + '/website';
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            var url = '/api/website/' + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website){
            var url = '/api/website/' + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId){
            var url = '/api/website/' + websiteId;
            return $http.delete(url);
        }
    }
})();

