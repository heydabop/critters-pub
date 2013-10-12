/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var genes = require('./genetics');

var passport = require('passport');
var google_strategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var HOST = process.env.HOST || "http://critters.0xsilverfish.com";

passport.use(
    new google_strategy({
        returnURL: HOST + '/auth/google/return',
        realm: HOST + '/'
    }, function(identifier, profile, done) {
        console.log(identifier + " HAS LOGGED IN!");
        // User.findOrCreate({ openId: identifier }, function(err, user) {
        //   done(err, user);
        // });

        if (!(identifier in critterdb)) {
            var newaccount = { team: [rand_starter("Dogmeat")] };
            newaccount.team[0].xp = 20;
            critterdb[identifier] = newaccount;
        }

        profile.identifier = identifier;
        return done(null, profile);
    }));

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
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

// apache go
app.enable('trust proxy')

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/auth/google', 
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/html/my/team');
        });

app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/html/my/team');
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

function critter_of_genome(genome, name) {
    return {
        genome: genome,
        species: genes.get_species(genome),
        hue: genes.get_hue(genome),
        xp: 0,
        tier: 1,
        name: name
    };
}

function rand_starter(name) {
    // Replace this with a more suitible selection mechanism
    var spec = select_random(genes.get_starter_species());
    // Use the species to create a new critter
    var critter = critter_of_genome(genes.new_genome(spec), name);
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
    if (req.body.name === undefined)
        return res.redirect('/'+req.params.fmt+'/my/team');

    var team = critterdb[req.user.identifier].team;
    if (team.length < 4)
        team.push(rand_starter(req.body.name));

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
    critter.species = genes.evolve_species(critter.species);
    critter.xp = 0;
    critter.tier = 2;

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
app.post('/:fmt/breed/:index', ensureAuthenticated, function (req, res) {
    var team = critterdb[req.user.identifier].team;
    var index = parseInt(req.params.index);
    if (index >= team.length || index < 0)
        return res.redirect('/'+req.params.fmt+'/my/team');
    // if (critter.xp != 100)
    //     return res.redirect('/'+req.params.fmt+'/my/team');

    res.render('breed', {
        title: 'Breed with?',
        user: req.user,
        team: team,
        index: index
    });
});
app.post('/:fmt/breed/:index/:index2', ensureAuthenticated, function (req, res) {
    var team = critterdb[req.user.identifier].team;
    var index = parseInt(req.params.index);
    if (index >= team.length || index < 0)
        return res.redirect('/'+req.params.fmt+'/my/team');
    var index2 = parseInt(req.params.index2);
    if (index2 >= team.length || index2 < 0)
        return res.redirect('/'+req.params.fmt+'/my/team');
    // if (critter.xp != 100)
    //     return res.redirect('/'+req.params.fmt+'/my/team');

    // Process breeding
    // Perform actual data update
    var c1 = team[index];
    var c2 = team[index2];
    var g = genes.cross_genomes(c1.genome, c2.genome);
    console.log("BREEDING===");
    console.log(JSON.stringify(c1.genome));
    console.log(JSON.stringify(c2.genome));
    console.log(JSON.stringify(g));
    if (g === undefined) {
        // Breeding failed.
        team.splice(index2, 1);
        res.redirect('/'+req.params.fmt+'/my/team');
        return;
    }
    var c3 = critter_of_genome(g, c2.name);
    team[index] = c3;
    team.splice(index2, 1);

    res.redirect('/'+req.params.fmt+'/my/team');
});

/////////////////////////////////



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google')
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
