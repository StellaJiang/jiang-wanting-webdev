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
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(websiteList){
                    $scope.websites = websiteList;
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        init();
    }

    function NewWebsiteController($location, $scope, $routeParams, WebsiteService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addNewWebsite = addNewWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(websiteList){
                    $scope.websites = websiteList;
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        init();

        function addNewWebsite(){
            var name = document.getElementById('name').value;
            var description = document.getElementById('description').value;
            if(name != "") {
                var website = {};
                website["name"] = name;
                website["description"] = description;
                WebsiteService
                    .createWebsite(vm.uid, website)
                    .success(function(website){
                        if(website){
                            $location.url("/user/" + vm.uid + "/website");
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
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
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(websiteList){
                    $scope.websites = websiteList;
                })
                .catch(function(error){
                    console.log(error);
                });
            WebsiteService
                .findWebsiteById(vm.wid)
                .success(function(website){
                    $scope.websiteDetail = website;
                })
                .catch(function(error){
                    console.log(error);
                });
            vm.webDetail = $scope.websiteDetail;
        }

        init();

        function saveEdit(){
            var updateWeb = {};
            updateWeb["name"] = document.getElementById('name').value;
            updateWeb["description"] = document.getElementById('description').value;
            updateWeb["_id"] = vm.wid;
            updateWeb["developerId"] = vm.uid;
            WebsiteService
                .updateWebsite(vm.wid, updateWeb)
                .success(function(website) {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function deleteWeb(){
            WebsiteService
                .deleteWebsite(vm.wid)
                .success(function(website){
                    if(website === '1') {
                        $location.url("/user/" + vm.uid + "/website");
                    }
                    else {
                        $location.url("/user/" + vm.uid + "/website");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    }

})();
