/**
 * Created by Wanting on 12/4/16.
 */

module.exports = function(app, model) {
    var passport      = require('passport');
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    /*var facebookConfig = {
     clientID     : "1203961226339249",
     clientSecret : "97ec48b717a64984b7bd1500d6b0563d",
     callbackURL  : "http://localhost:3000/auth/facebook/callback"
     };*/

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    app.get('/api/users/all', getAllUsers);
    app.post('/api/user', createUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.put('/api/user/:uid/friend/:fid', addFriend);
    app.post('/api/user/:uid/friend/:fid', deleteFriend);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    app.put('/api/user/:uid/password', updatePassword);
    app.put('/api/admin/password/:uid', adminUpdatePassword);

    function facebookLogin(token, refreshToken, profile, done){
        model
            .userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser){
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                id:    profile.id,
                                token: token,
                                displayName: profile.displayName
                            }
                        }
                        return model
                            .userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }

    function logout(req, res){
        req.logout();
        res.sendStatus(200);
    }

    function checkLogin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var username = req.body.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.sendStatus(400).send("Username already in use.");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        req.body.following = [];
                        return model
                            .userModel
                            .createUser(req.body);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(newUser) {
                    if(newUser) {
                        req.login(newUser, function(err) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            }
                            else {
                                res.json(newUser);
                            }
                        });
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        model
            .userModel
            .findUserById(uid)
            .then(
                function(user){
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var uid = req.params.userId;
        var user = req.body;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function addFriend(req, res){
        var uid = req.params.uid;
        var fid = req.params.fid;
        model
            .userModel
            .findUserById(uid)
            .then(
                function(user){
                    if(user) {
                        var friends = user.following;
                        friends.push(fid);
                        return model
                            .userModel
                            .updateFriend(uid, friends);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteFriend(req, res){
        var uid = req.params.uid;
        var fid = req.params.fid;
        model
            .userModel
            .findUserById(uid)
            .then(
                function(user){
                    if(user) {
                        var friends = user.following;
                        for(var i = 0; i < friends.length; i++) {
                            if(friends[i] == fid) {
                                friends.splice(i, 1);
                                break;
                            }
                        }
                        return model
                            .userModel
                            .updateFriend(uid, friends);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }


    function updatePassword(req, res) {
        var uid = req.params.uid;
        var body = req.body;

        model
            .userModel
            .findUserById(uid)
            .then(
                function(user){
                    if(user) {
                        if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                            return model
                                .userModel
                                .updatePassword(uid, bcrypt.hashSync(req.body.newPassword));
                        }
                        else {
                            res.send('0');
                        }
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function adminUpdatePassword(req, res) {
        var uid = req.params.uid;
        var body = req.body;

        model
            .userModel
            .findUserById(uid)
            .then(
                function(user){
                    if(user) {
                        return model
                            .userModel
                            .updatePassword(uid, bcrypt.hashSync(req.body.newPassword));

                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllUsers(req, res) {
        model
            .userModel
            .getAllUsers()
            .then(
                function(users){
                    if(users) {
                        res.send(users);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

};