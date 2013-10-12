
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var passport = require('passport');
var google_strategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new google_strategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    }, function(identifier, profile, done) {
        console.log(identifier + " HAS LOGGED IN!");
        // User.findOrCreate({ openId: identifier }, function(err, user) {
        //   done(err, user);
        // });
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.session({ secret: 'aosifninvlajvbljhbhjlwrg' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/auth/google', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

////////////////////////////////
// Main implementation here

var critterdb = {};

function dblookup(id) {
    if (!(id in critterdb)) {
        var critter = {pic0: "foo.png", pic1: "foo.png", pic2: "foo.png", hue: 0};
        critterdb[id] = [critter];
    }
    return critterdb[id];
}

app.get('/rest/my/team', ensureAuthenticated, function (req, res) {
    var team = dblookup(req.user.identity);
    var body = JSON.stringify(team);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});
app.post('/rest/my/team/push', ensureAuthenticated, function (req, res) {
    var team = dblookup(req.user.identity);
    team.push(0);

    res.redirect('/my/team');

    // var body = JSON.stringify(team);
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Length', body.length);
    // res.end(body);
});

/////////////////////////////////



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google')
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
