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
        vm.sort = sort;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .success(function(widgetList) {
                    $scope.widgets = widgetList;
                })
                .catch(function(error){
                    console.log(error);
                });

            $(".wam-widgets").sortable({
                axis: 'y'
            });
        }

        init();

        function sort(start, end) {
            var index = {};
            index['start'] = start;
            index['end'] = end;
            WidgetService
                .sortItem(vm.pid, index)
                .success(function(code){})
                .catch(function(error){
                    console.log(error);
                });
        }

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
            WidgetService
                .findTypes()
                .success(function(types){
                    $scope.types = types;
                })
                .catch(function(error){
                    console.log(error);
                });
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
        vm.goBack = goBack;

        function init(){
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function(widget){
                    $scope.widget = widget;
                    $scope.type = $scope.widget.widgetType.toLowerCase();
                    if($scope.type === 'image') {
                        var tempUrl = $scope.widget.url;
                        $scope.url = tempUrl;
                        if(!$scope.widget.type && tempUrl.substring(0, 1) == '/') {
                            var temp = tempUrl.split("/");
                            $scope.url = temp[temp.length - 1];
                        }
                        WidgetService
                            .findTempImage(vm.uid)
                            .success(function (widget) {
                                if (widget != "0") {
                                    if(widget["url"].substring(0, 1) == '/') {
                                        var temp = widget["url"].split("/");
                                        $scope.url = temp[temp.length - 1];
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });


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
                var currUrl = document.getElementById('url').value;

                if(currUrl.split('/').length == 1) {
                    newWidget["url"] = '/../../uploads/' + currUrl;
                }
                else {
                    newWidget["url"] = currUrl;
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
                WidgetService
                    .createWidget(vm.pid, newWidget)
                    .success(function(widget) {
                        WidgetService
                            .deleteTempImage(vm.uid)
                            .success(function(code){})
                            .catch(function(error){
                                console.log(error);
                            });
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
                    .catch(function(error){
                        console.log(error);
                    });

            }
            else {
                newWidget["_id"] = vm.wgid;
                newWidget["pageId"] = vm.pid;
                WidgetService
                    .updateWidget(vm.wgid, newWidget)
                    .success(function(widget) {
                        WidgetService
                            .deleteTempImage(vm.uid)
                            .success(function(code){})
                            .catch(function(error){
                                console.log(error);
                            });
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }

        }

        function deleteWig(){
            if(!$scope.widget.type) {
                WidgetService
                    .deleteWidget(vm.wgid)
                    .success(function(code) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
        }

        function goBack(){
            WidgetService
                .deleteTempImage(vm.uid)
                .success(function(code) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .catch(function(error){
                    console.log(error);
                });

        }

    }
})();
