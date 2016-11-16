/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app, model) {
    /*var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];*/

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res){
        var website = req.body;
        var uid = req.params.userId;
        model
            .websiteModel
            .createWebsiteForUser(uid, website)
            .then(
                function(newWeb){
                    res.send(newWeb);

                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res){
        var uid = req.params.userId;
        model
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function(websites){
                    if(websites){
                        res.json(websites);
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

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    if(website){
                        res.send(website);
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

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.websiteId;
        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(wid)
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