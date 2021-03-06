/**
 * Created by Wanting on 11/13/16.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("pageModel", pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page){
        page["_website"] = websiteId;
        return pageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId){
        return pageModel
            .find({
                _website: websiteId
            });
    }

    function findPageById(pageId){
        return pageModel
            .findById(pageId);
    }

    function updatePage(pageId, page){
        return pageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                }
            );
    }

    function deletePage(pageId){
        return pageModel
            .remove({
                _id: pageId
            })
    }
};

