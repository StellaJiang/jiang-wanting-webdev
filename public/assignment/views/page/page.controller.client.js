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
            $scope.websites = WebsiteService.findWebsitesByUser(vm.uid);
            $scope.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        init();
    }

    function NewPageController($location, $scope, $routeParams, PageService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.addPage = addPage;

        function init(){
            $scope.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        init();

        function addPage(){
            var name = document.getElementById('name').value;
            var title = document.getElementById('title').value;
            var page = {};
            page["name"] = name;
            page["title"] = title;
            PageService.createPage(vm.wid, page);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
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
            $scope.pages = PageService.findPageByWebsiteId(vm.wid);
            $scope.currentPage = PageService.findPageById(vm.pid);
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
            PageService.updatePage(vm.pid, page);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }

        function deletePage(){
            PageService.deletePage(vm.pid);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }
    }
})();