/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http){

        var service = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            findTypes: findTypes,
            findTempImage: findTempImage,
            deleteTempImage: deleteTempImage,
            sortItem: sortItem,
            selectFlickr: selectFlickr
        };

        return service;

        function createWidget(pageId, widget){
            var url = '/api/page/' + pageId + '/widget';
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId){
            var url = '/api/page/' + pageId + '/widget';
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = '/api/widget/' + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            var url = '/api/widget/' + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId){
            var url = '/api/widget/' + widgetId;
            return $http.delete(url);
        }

        function findTypes(){
            return $http.get('/api/types');
        }

        function findTempImage(uid){
            return $http.get('/api/tempImage/' + uid);
        }

        function deleteTempImage(uid){
            return $http.delete('/api/deleteTempImage/' + uid);
        }

        function sortItem(pageId, start, end){
            var url = '/page/'+pageId+'/widget?start=' + start + '&end=' + end;
            return $http.put(url);
        }

        function selectFlickr(uid, photo){
            var url = '/api/'+uid+'/flickr';
            var content = {photo: photo};
            return $http.put(url, content);
        }
    }
})();
