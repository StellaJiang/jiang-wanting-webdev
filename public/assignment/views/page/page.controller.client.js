/**
 * Created by Wanting on 10/15/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($scope, $routeParams, PageService, WebsiteService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init(){
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(websiteList){
                    $scope.websites = websiteList;
                })
                .catch(function(error){
                    console.log(error);
                });
            PageService
                .findPageByWebsiteId(vm.wid)
                .success(function(pages) {
                    $scope.pages = pages;
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        init();
    }

    function NewPageController($location, $scope, $routeParams, PageService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.addPage = addPage;

        function init(){
            PageService
                .findPageByWebsiteId(vm.wid)
                .success(function(pages) {
                    $scope.pages = pages;
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        init();

        function addPage(){
            var name = document.getElementById('name').value;
            var title = document.getElementById('title').value;
            var page = {};
            page["name"] = name;
            page["title"] = title;
            PageService
                .createPage(vm.wid, page)
                .success(function(page) {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                })
                .catch(function(error){
                    console.log(error);
                });

        }
    }

    function EditPageController($location, $scope, $routeParams, PageService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            PageService
                .findPageByWebsiteId(vm.wid)
                .success(function(pages) {
                    $scope.pages = pages;
                })
                .catch(function(error){
                    console.log(error);
                });

            PageService
                .findPageById(vm.pid)
                .success(function(page) {
                    if(page === '0') {
                        console.log('no page is found!');
                    }
                    else {
                        $scope.currentPage = page;
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        init();

        function updatePage(){
            var name = document.getElementById('name').value;
            var title = document.getElementById('title').value;
            var page = {};
            page["_id"] = vm.pid;
            page["name"] = name;
            page["title"] = title;
            page["websiteId"] = vm.wid;
            PageService
                .updatePage(vm.pid, page)
                .success(function(page) {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                })
                .catch(function(error) {
                    console.log(error);
                });

        }

        function deletePage(){
            PageService
                .deletePage(vm.pid)
                .success(function(code){
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    }
})();