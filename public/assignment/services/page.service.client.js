/**
 * Created by Wanting on 10/11/16.
 */


(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var service = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById: findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return service;

        function createPage(websiteId, page){
            var last_page_id = pages[pages.length - 1]._id + 1;
            last_page_id.toString();
            page["_id"] = last_page_id;
            page["websiteId"] = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId){
            var pageList = [];
            var idx = 0;
            for(var i = 0; i < pages.length; i++) {
                if(pages[i].websiteId == websiteId) {
                    pageList[idx++] = pages[i];
                }
            }
            return pageList;
        }

        function findPageById(pageId){
            for(var i = 0; i < pages.length; i++) {
                if(pages[i]._id == pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            for(var i = 0; i < pages.length; i++) {
                if(pages[i]._id == pageId) {
                    pages[i] = page;
                    break;
                }
            }
        }

        function deletePage(pageId){
            for(var i = 0; i < pages.length; i++) {
                if(pages[i]._id == pageId) {
                    pages.splice(i, 1);
                    break;
                }
            }
        }
    }
})();

