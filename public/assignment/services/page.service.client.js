/**
 * Created by Wanting on 10/11/16.
 */


(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var service = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById: findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return service;

        function createPage(websiteId, page){
            var url = '/api/website/' + websiteId + '/page';
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId){
            var url = '/api/website/' + websiteId + '/page';
            return $http.get(url);
        }

        function findPageById(pageId){
            var url = '/api/page/' + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page){
            var url = '/api/page/' + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId){
            var url = '/api/page/' + pageId;
            return $http.delete(url);
        }
    }
})();

