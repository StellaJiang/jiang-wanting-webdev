/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("widgetModel", widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        findAllTypes: findAllTypes,
        uploadImage: uploadImage,
        findTempImage: findTempImage,
        deleteTempImage: deleteTempImage,
        addType: addType,
        sortWidget: sortWidget,
        updatePriorityWhenDel: updatePriorityWhenDel,
        selectFlicker: selectFlicker
    };
    return api;

    function createWidget(pageId, widget){
        widget["_page"] = pageId;
        widget["isType"] = false;
        return widgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId){
        return widgetModel
            .find({
                _page: pageId
            })
            .sort({
                priority: 1
            });
    }

    function findWidgetById(widgetId){
        return widgetModel
            .findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        switch(widget.widgetType) {
            case "HEADER": return widgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                );
            break;

            case "IMAGE": return widgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }
                );
                break;

            case "YOUTUBE": return widgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }
                );
                break;

            case "TEXT": return widgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }
                );
                break;

            case "HTML": return widgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text
                    }
                );
                break;

            default:
                break;
        }
    }

    function deleteWidget(widgetId){
        return widgetModel
            .remove({
                _id: widgetId
            })
    }

    function updatePriorityWhenDel(pageId, priority){
        return widgetModel
            .find({
                    _page: pageId
                },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(widget.priority > priority){
                            widget.priority--;
                            widget.save(function(){});
                        }
                    });
                });
    }

    function findAllTypes(){
        return widgetModel
            .find({
                isType: true
            });
    }

    function uploadImage(userId, filename){
        var tempImage = widgetModel
            .find({
                _user: userId
            });
        if(tempImage.length > 0) {
            return widgetModel
                .update(
                    {
                        _id: tempImage._id
                    },
                    {
                        url: '/../../uploads/' + filename
                    }
                );
        } else {
            var temp = {};
            temp["_user"] = userId;
            temp["url"] = '/../../uploads/' + filename;
            return widgetModel.create(temp);
        }
    }

    function selectFlicker(uid, photo){
        var tempImage = widgetModel
            .find({
                _user: uid
            });
        if(tempImage.length > 0) {
            return widgetModel
                .update(
                    {
                        _id: tempImage._id
                    },
                    {
                        url: photo
                    }
                );
        } else {
            var temp = {};
            temp["_user"] = uid;
            temp["url"] = photo
            return widgetModel.create(temp);
        }
    }
    function findTempImage(uid){
        return widgetModel
            .find({
                _user: uid
            });
    }

    function deleteTempImage(uid){
        return widgetModel
            .remove({
                _user: uid
            })
    }

    function addType(types){
        return widgetModel.create(types);
    }

    function sortWidget(pageId, start, end){
        start = parseInt(start);
        end = parseInt(end);
        return widgetModel
            .find({
                _page: pageId
            },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(start > end){
                            if(widget.priority >= end && widget.priority < start){
                                widget.priority++;
                                widget.save(function(){});
                            } else if(widget.priority === start) {
                                widget.priority = end;
                                widget.save(function(){});
                            }
                        } else {
                            if(widget.priority === start){
                                widget.priority = end;
                                widget.save(function(){});
                            } else if(widget.priority > start  && widget.priority <= end) {
                                widget.priority--;
                                widget.save(function(){});
                            }
                        }
                    });
            });
    }
};
