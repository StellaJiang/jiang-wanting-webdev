/**
 * Created by Wanting on 10/24/16.
 */

module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            fundUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function fundUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        var uid = parseInt(req.params.userId);
        for(var u in users) {
            if(parseInt(users[u]._id) === uid) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function createUser(req, res) {
        var user = req.body;
        for(var i = 0; i < users.length; i++) {
            if(users[i].username == user.username) {
                return null;
            }
        }
        var last_user_id = users[users.length - 1]._id + 1;
        last_user_id.toString();
        user["_id"] = last_user_id;
        users.push(user);
        res.send(user);
    }

    function updateUser(req, res) {
        var uid = parseInt(req.params.userId);
        var user = req.body;
        for(var u in users){
            if(parseInt(users[u]._id) == uid){
                users[u] = user;
                res.send(user);
                return;
            }
        }
        res.send('0');
    }

    function deleteUser(req, res) {
        var uid = parseInt(req.params.userId);
        for(var u in users){
            if(parseInt(users[u]._id) == uid){
                users.splice(u, 1);
                res.send('1');
                return;
            }
        }
        res.send('0');
    }
};