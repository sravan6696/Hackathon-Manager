var express = require('express');
var app = express();
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = require('./config/db');

var port = process.env.PORT || 8080; 

mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Success'))
    .catch(err => console.log(err));

app.use(express.json()); 
app.use(express.json({ type: 'application/vnd.api+json' })); 
app.use(express.urlencoded()); 

app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app); // configure our routes

app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
