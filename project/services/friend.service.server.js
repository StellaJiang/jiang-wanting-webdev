/**
 * Created by Wanting on 12/7/16.
 */

module.exports = function(app, model) {
    app.post('/api/friend', addFriend);
    app.get('/api/user/:uid/following', getFollowing);
    app.get('/api/user/:uid/follower', getFollower);
    app.delete('/api/friend/:relationId', deleteFriend);

    function addFriend(req, res){
        var relation = req.body;
        model
            .friendModel
            .addFriend(relation)
            .then(
                function(friend){
                    if(friend) {
                        res.send(friend);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getFollowing(req, res){
        var uid = req.params.uid;
        model
            .friendModel
            .getFollowing(uid)
            .then(
                function(friends){
                    if(friends) {
                        res.send(friends);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getFollower(req, res){
        var uid = req.params.uid;
        model
            .friendModel
            .getFollower(uid)
            .then(
                function(friends){
                    if(friends) {
                        res.send(friends);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFriend(req, res){
        var rid = req.params.relationId;
        model
            .friendModel
            .deleteFriend(rid)
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