/**
 * Created by Wanting on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($scope, $routeParams, $sce, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYuoTubeUrl = checkSafeYuoTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init(){
            $scope.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }

        init();

        function checkSafeHtml(html){
            return $sce.trustAsHtml(html);
        }

        function checkSafeYuoTubeUrl(url){
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($scope, $routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init(){
            $scope.types = WidgetService.findTypes();
        }
        init();
    }

    function EditWidgetController($location, $scope, $routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = update;
        vm.deleteWidget = deleteWig;

        function init(){
            $scope.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

        function update(){
            var newWidget = {};
            if($scope.widget.widgetType == "HEADER") {
                newWidget["name"] = document.getElementById('name').value;
                newWidget["text"] = document.getElementById('text').value;
                newWidget["size"] = document.getElementById('size').value;
            }
            else if($scope.widget.widgetType == "IMAGE") {
                newWidget["name"] = document.getElementById('name').value;
                newWidget["text"] = document.getElementById('text').value;
                newWidget["width"] = document.getElementById('width').value;
                var url = document.getElementById('url').value;;
                if(url != "") {
                    newWidget["url"] = url;
                }

                var file = document.getElementById('upload').value;
                if(file != "") {
                    newWidget["url"] = "image/mosquito.jpg";
                }
            }
            else if($scope.widget.widgetType == "YOUTUBE") {
                newWidget["name"] = document.getElementById('name').value;
                newWidget["text"] = document.getElementById('text').value;
                newWidget["url"] = document.getElementById('url').value;
                newWidget["width"] = document.getElementById('width').value;
            }

            newWidget["widgetType"] = $scope.widget.widgetType;
            if($scope.widget.type) {
                WidgetService.createWidget(vm.pid, newWidget);
            }
            else {
                newWidget["_id"] = vm.wgid;
                newWidget["pageId"] = vm.pid;
                WidgetService.updateWidget(vm.wgid, newWidget);
            }
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWig(){
            if(!$scope.widget.type) {
                WidgetService.deleteWidget(vm.wgid);
            }
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }
})();
