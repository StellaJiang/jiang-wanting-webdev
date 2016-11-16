/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app, model) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res){
        var page = req.body;
        var wid = req.params.websiteId;
        model
            .pageModel
            .createPage(wid, page)
            .then(
                function(newPage){
                    res.send(newPage);

                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res){
        var wid = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages){
                    if(pages){
                        res.json(pages);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    if(page){
                        res.send(page);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
};