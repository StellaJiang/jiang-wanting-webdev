/**
 * Created by Wanting on 11/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "5813bd2a575886050414e52ad65befc6";
    var secret = "4f818c0b29666140";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var service = {
            searchPhotos : searchPhotos
        };

        return service;

        function searchPhotos(searchText){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }


})();