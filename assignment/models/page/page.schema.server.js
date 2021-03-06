/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var widgetSchema = require("../widget/widget.schema.server.js")(mongoose);

    var pageSchema = mongoose.Schema({
        _website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Website'
        },
        name: String,
        title: String,
        description: String,
        widgets: [widgetSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});

    return pageSchema;
};