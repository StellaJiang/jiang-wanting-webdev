/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService(){
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ]

        var service = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };

        return service;

        function createWebsite(website){
            var website_id = websites[websites.length - 1]._id + 1;
            website_id.toString();
            website["_id"] = website_id;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId){
            var websiteList = [];
            var idx = 0;
            for(var i = 0; i < websites.length; i++) {
                if(websites[i].developerId == userId) {
                    websiteList[idx++] = websites[i];
                }
            }
            return websiteList;
        }

        function findWebsiteById(websiteId){
            for(var i = 0; i < websites.length; i++) {
                if(websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(var i = 0; i < websites.length; i++) {
                if(websites[i]._id == websiteId) {
                    websites[i] = website;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId){
            for(var i = 0; i < websites.length; i++) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i, 1);
                    break;
                }
            }
        }
    }
})();

