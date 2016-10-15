/**
 * Created by Wanting on 10/12/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($scope, $routeParams, WebsiteService){
        var vm = this;
        vm.uid = $routeParams.uid;

        function init(){
            $scope.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();
    }

    function NewWebsiteController($location, $scope, $routeParams, WebsiteService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addNewWebsite = addNewWebsite;

        function init(){
            $scope.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();

        function addNewWebsite(){
            var name = document.getElementById('name').value;
            var description = document.getElementById('description').value;
            console.log("name/" + name + "/name")
            if(name != "") {
                var website = {};
                website["name"] = name;
                website["description"] = description;
                website["developerId"] = vm.uid.toString();
                WebsiteService.createWebsite(website);
                $location.url("/user/" + vm.uid + "/website");
            }
            else {
                $location.url("/user/" + vm.uid + "/website");
            }
        }

    }

    function EditWebsiteController($location, $scope, $routeParams, WebsiteService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.saveEdit = saveEdit;
        vm.deleteWeb = deleteWeb;

        function init(){
            $scope.websites = WebsiteService.findWebsitesByUser(vm.uid);
            $scope.websiteDetail = WebsiteService.findWebsiteById(vm.wid);
            vm.webDetail = $scope.websiteDetail;
        }

        init();

        function saveEdit(){
            var updateWeb = {};
            updateWeb["name"] = document.getElementById('name').value;
            updateWeb["description"] = document.getElementById('description').value;
            updateWeb["_id"] = vm.wid;
            updateWeb["developerId"] = vm.uid;
            WebsiteService.updateWebsite(vm.wid, updateWeb);
            $location.url("/user/" + vm.uid + "/website");
        }

        function deleteWeb(){
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

})();
