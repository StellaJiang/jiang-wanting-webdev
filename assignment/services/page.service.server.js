/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res){
        var page = req.body;
        var wid = req.params.websiteId;
        wid.toString();
        var last_page_id = pages[pages.length - 1]._id + 1;
        last_page_id.toString();
        page["_id"] = last_page_id;
        page["websiteId"] = wid;
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res){
        var wid = parseInt(req.params.websiteId);
        var pageList = [];
        var idx = 0;
        for(var i = 0; i < pages.length; i++) {
            if(pages[i].websiteId == wid) {
                pageList[idx++] = pages[i];
            }
        }
        res.send(pageList);
    }

    function findPageById(req, res){
        var pageId = parseInt(req.params.pageId);
        for(var i = 0; i < pages.length; i++) {
            if(pages[i]._id == pageId) {
                res.send(pages[i]);
                return;
            }
        }
        return '0';
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = parseInt(req.params.pageId);
        for(var i = 0; i < pages.length; i++) {
            if(pages[i]._id == pageId) {
                pages[i] = page;
                res.send(page);
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req, res) {
        var pageId = parseInt(req.params.pageId);
        for(var i = 0; i < pages.length; i++) {
            if(pages[i]._id == pageId) {
                pages.splice(i, 1);
                res.send('1');
                return;
            }
        }
        res.send('0');
    }
};