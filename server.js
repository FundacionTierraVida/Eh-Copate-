var express = require('express');
var app = express();
var mongoose = require('mongoose');


// Connecting to database
mongoose.connect('mongodb://userehcopate:ehcopate@ds055689.mongolab.com:55689/ehcopate');

// Config
app.configure(function() {
    // Location of the static files
    app.use(express.static(__dirname + '/src'));
    // It displays a log of all request in the console       
    app.use(express.logger('dev')); 
    // Change the HTML POST method                   
    app.use(express.bodyParser());
    // Simulate DELETE y PUT                      
    app.use(express.methodOverride());                  
});


var projectsSchema = new mongoose.Schema({
    nameSchool: {type : String, default: ''},
    nameProject: {type : String, default: ''},
    projectDescription: {type : String, default: ''}
});

var BBDD = mongoose.model('Projects', projectsSchema);



// Routes of our API
// GET of all objects
app.get('/api/projects', function(req, res) {                
    BBDD.find(function(err, projects) {
        if(err) {
            res.send(err);
        }
        res.json(projects);
    });
});

// POST that creates an object and returns all objects after creation
app.post('/api/projects', function(req, res) {                
    BBDD.create({
        nameSchool: req.body.nameSchool,
        nameProject: req.body.nameProject,
        projectDescription: req.body.projectDescription,
        done: false
    }, function(err, project){
        if(err) {
            res.send(err);
        }

        BBDD.find(function(err, projects) {
            if(err){
                res.send(err);
            }
            res.json(projects);
        });
    });
});

// DELETE a specific object and returns all objects after deleting it.
app.delete('/api/projects/:project', function(req, res) {    
    BBDD.remove({
        _id: req.params.project
    }, function(err, project) {
        if(err){
            res.send(err);
        }

        BBDD.find(function(err, projects) {
            if(err){
                res.send(err);
            }
            res.json(projects);
        });

    })
});


// Loads a simple HTML view where will our Single Page App
// Angular handle the Frontend
app.get('*', function(req, res) {          
    res.sendfile('./src/index.html');       
});


// Listens on port 8080 and runs the server
app.listen(8080, function() {
    console.log('App listening on port 8080');
});