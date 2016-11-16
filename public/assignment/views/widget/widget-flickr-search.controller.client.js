/**
 * Created by Wanting on 11/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrController", FlickrController);

    function FlickrController($routeParams, $location, FlickrService, WidgetService){
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.updateWidget = updateWidget;
        vm.selectPhoto = selectPhoto;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init($scope){
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function(widget){
                    $scope.widget = widget;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function searchPhotos(searchText){
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.url = url;
        }

        function updateWidget(){
            WidgetService
                .selectFlickr(vm.uid, vm.url)
                .then(function(status){
                    var url = "/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid;
                    $location.url(url);
                });
        }

    }
})();