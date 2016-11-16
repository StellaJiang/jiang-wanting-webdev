/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var pageSchema = require("../page/page.schema.server.js")(mongoose);

    var webSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        description: String,
        pages: [pageSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "website"});

    return webSchema;
};