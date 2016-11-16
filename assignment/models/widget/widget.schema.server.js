/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var widgetSchema = mongoose.Schema({
        _page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Page'
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        widgetType: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        isType: Boolean,
        typeName: String,
        priority: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});

    return widgetSchema;
};