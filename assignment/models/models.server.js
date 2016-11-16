/**
 * Created by Wanting on 11/13/16.
 */


module.exports = function(){
    var mongoose = require("mongoose");
    var uri = "mongodb://stella:Jwt!19880906@ds033116.mlab.com:33116/stellajiang";
    mongoose.connect(uri);
    //var connectionString = 'mongodb://127.0.0.1:27017/webdev';
    //mongoose.connect(connectionString);

    var types = [
        { "widgetType": "HEADER", "typeName": "Header", "isType": true},
        { "widgetType": "LABEL", "typeName": "Label", "isType": true},
        { "widgetType": "HTML", "typeName": "HTML", "isType": true},
        { "widgetType": "TEXT", "typeName": "Text", "isType": true},
        { "widgetType": "LINK", "typeName": "Link", "isType": true},
        { "widgetType": "BUTTON", "typeName": "Button", "isType": true},
        { "widgetType": "IMAGE", "typeName": "Image", "isType": true},
        { "widgetType": "YOUTUBE", "typeName": "Youtube", "isType": true},
        { "widgetType": "DATA-TABLE", "typeName": "Data Table", "isType": true},
        { "widgetType": "REPEATER", "typeName": "Repeater", "isType": true}
    ];

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel:websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    //widgetModel.addType(types);
    return model;
};