/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var webSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("websiteModel", webSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website["_user"] = userId;
        return websiteModel.create(website);
    }

    function findAllWebsitesForUser(userId){
        return websiteModel
            .find({
                _user: userId
            });
    }

    function findWebsiteById(websiteId){
        return websiteModel
            .findById(websiteId);
    }

    function updateWebsite(websiteId, website){
        return websiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function deleteWebsite(websiteId){
        return websiteModel
            .remove({
                _id: websiteId
            })
    }
};