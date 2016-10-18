/**
 * Created by Wanting on 10/11/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService(){
        var widgets = [
            { "_id": "0", "widgetType": "HEADER", "typeName": "Header", "type": true},
            { "_id": "1", "widgetType": "LABEL", "typeName": "Label", "type": true},
            { "_id": "2", "widgetType": "HTML", "typeName": "HTML", "type": true},
            { "_id": "3", "widgetType": "TEXT-INPUT", "typeName": "Text Input", "type": true},
            { "_id": "4", "widgetType": "LINK", "typeName": "Link", "type": true},
            { "_id": "5", "widgetType": "BUTTON", "typeName": "Button", "type": true},
            { "_id": "6", "widgetType": "IMAGE", "typeName": "Image", "type": true},
            { "_id": "7", "widgetType": "YOUTUBE", "typeName": "Youtube", "type": true},
            { "_id": "8", "widgetType": "DATA-TABLE", "typeName": "Data Table", "type": true},
            { "_id": "9", "widgetType": "REPEATER", "typeName": "Repeater", "type": true},
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]

        var service = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            findTypes: findTypes
        };

        return service;

        function createWidget(pageId, widget){
            var last_widget_id = widgets[widgets.length - 1]._id + 1;
            last_widget_id.toString();
            widget["_id"] = last_widget_id;
            widget["pageId"] = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId){
            var widgetList = [];
            var idx = 0;
            for(var i = 0; i < widgets.length; i++) {
                if(widgets[i].pageId == pageId) {
                    widgetList[idx++] = widgets[i];
                }
            }
            return widgetList;
        }

        function findWidgetById(widgetId){
            for(var i = 0; i < widgets.length; i++) {
                if(widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            for(var i = 0; i < widgets.length; i++) {
                if(widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    break;
                }
            }
        }

        function deleteWidget(widgetId){
            for(var i = 0; i < widgets.length; i++) {
                if(widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    break;
                }
            }
        }

        function findTypes(){
            var types = [];
            var idx = 0;
            for(var i = 0; i < widgets.length; i++) {
                if(widgets[i].type) {
                    types[idx++] = widgets[i];
                }
            }
            return types;
        }
    }
})();
