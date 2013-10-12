
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

        if (!(identifier in critterdb)) {
            var newaccount = { team: [rand_starter()] };
            newaccount.team[0].xp = 20;
            critterdb[identifier] = newaccount;
        }

        profile.identifier = identifier;
        return done(null, profile);
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

function select_random(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

var crittertypes = ["ball", "ball2", "disk", "duck", "duck2", "plant-nin2", "plant1", "plant2"];
function rand_starter() {
    var rand = select_random(crittertypes);
    var critter = { species: rand, hue: 0, xp: 5 };
    return critter;
}

app.get('/:fmt/my/team', ensureAuthenticated, function (req, res) {
    var team = critterdb[req.user.identifier].team;

    if (req.params.fmt == 'json') {
        var body = JSON.stringify(team);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    } else {
        res.render('team', {
            title: 'My Team',
            user: req.user,
            team: team
        });
    }
});
app.post('/:fmt/my/team/push', ensureAuthenticated, function (req, res) {
    var team = critterdb[req.user.identifier].team;
    if (team.length < 4)
        team.push(rand_starter());

    res.redirect('/'+req.params.fmt+'/my/team');

    // var body = JSON.stringify(team);
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Length', body.length);
    // res.end(body);
});
app.post('/:fmt/feed/:index', ensureAuthenticated, function (req, res) {
    (function () {
        var team = critterdb[req.user.identifier].team;
        var index = parseInt(req.params.index);
        if (index >= team.length || index < 0)
            return;
        // Process feeding here
        team[index].xp += Math.floor(Math.random() * 20);
        if (team[index].xp >= 100)
            team[index].xp = 100;
        return;
    })();

    return res.redirect('/'+req.params.fmt+'/my/team');
});
app.post('/:fmt/evolve/:index', ensureAuthenticated, function (req, res) {
    var team = critterdb[req.user.identifier].team;
    var index = parseInt(req.params.index);
    if (index >= team.length || index < 0)
        return res.redirect('/'+req.params.fmt+'/my/team');
    var critter = team[index];
    // if (critter.xp != 100)
    //     return res.redirect('/'+req.params.fmt+'/my/team');

    // Process evolution
    // Perform actual data update
    var oldspecies = critter.species;
    while (critter.species == oldspecies) {
        critter.species = select_random(crittertypes);
    }
    critter.xp = 0;

    // If requested, send the user a pretty page
    if (req.params.fmt == 'json') {
        var body = JSON.stringify(team);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    } else {
        res.render('evolve', {
            title: 'IS EVOLVING',
            user: req.user,
            critter: critter,
            oldspecies: oldspecies
        });
    }
});

/////////////////////////////////



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google')
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
