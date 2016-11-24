/**
 * Created by Wanting on 10/24/16.
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

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/profile',
            failureRedirect: '/assignment/#/login'
        }));
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    app.post('/api/user', createUser);
    app.post('/api/register', register);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

/*    var facebookConfig = {
        clientID     : "371538036515694",
        clientSecret : "c7858cd0af1cb3491e14389522168ba9",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };*/

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function checkLogin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res){
        req.logout();
        res.send(200);
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

    function login(req, res){
        var user = req.user;
        res.json(user);
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

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
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

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(users){
                    if(users){
                        res.json(users);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
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

    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser){
                    res.send(newUser);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.status(400).send("Username already in use.");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
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
                                res.status(400).send(err);
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

    function updateUser(req, res) {
        var uid = req.params.userId;
        var user = req.body;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var uid = req.params.userId;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
};