/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res){
        var website = req.body;
        var website_id = parseInt(websites[websites.length - 1]._id) + 1;
        website_id.toString();
        website["_id"] = website_id;
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res){
        var uid = parseInt(req.params.userId);
        var websiteList = [];
        var idx = 0;
        for(var i = 0; i < websites.length; i++) {
            if(parseInt(websites[i].developerId) === uid) {
                websiteList[idx++] = websites[i];
            }
        }
        res.send(websiteList);
    }

    function findWebsiteById(req, res) {
        var wid = parseInt(req.params.websiteId);
        for(var i = 0; i < websites.length; i++) {
            if(parseInt(websites[i]._id) === wid) {
                res.send(websites[i]);
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = parseInt(req.params.websiteId);
        for(var i = 0; i < websites.length; i++) {
            if(parseInt(websites[i]._id) === wid) {
                websites[i] = website;
                res.send(website);
                return;
            }
        }
        res.send('0');
    }

    function deleteWebsite(req, res) {
        var wid = parseInt(req.params.websiteId);
        for(var i = 0; i < websites.length; i++) {
            if(parseInt(websites[i]._id) === wid) {
                websites.splice(i, 1);
                res.send('1');
                return;
            }
        }
        res.send('0');
    }
};