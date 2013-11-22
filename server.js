'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    hbs=require('hbs'),
    mongoose = require('mongoose'),
    connect = require('connect');

var app = express();

app.set('views',path.join(__dirname, 'app/views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(connect.urlencoded());
app.use(connect.json());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.cookieParser());
app.use(express.session({secret:'reallyLongSecret12345355'}));
app.use(app.router);


mongoose = mongoose.connect('mongodb://localhost/rwa');
mongoose.connection.on('conected',function(){
  console.log('connected to mongoDB');
});


// Routes
//dynamically include all routes
fs.readdirSync('./routes').forEach(function(filename){
  var route ={};
  if(filename.substr(-3) === '.js')
  {
          route = require('./routes/'+filename);
          route.setup(app);
  }
});

/*app.get('/', function(req, res){
    res.render('index', { title: 'Login' });
});*/

app.listen(9000);
console.log('Express server listening on port 9000');