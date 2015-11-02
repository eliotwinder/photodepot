// IMPORT DEPENDENCIES
var config = require('./config.example');
var express = require('express');
var http = require('http');


// INITIALIZE EXPRESS APP
app = express();

// IMPORT MIDDLEWARE
var fileToBuffer = require('./middleware/fileToBuffer');
var bodyParser = require('body-parser');
var session = require('express-session');
var isLoggedIn = require('./middleware/isLoggedIn');

// DATABASE
var db = require('./models/dbConfig'); 

// SYNC DB, THEN CREATE ROUTES AND START SERVER
db.sequelize.sync().then(function(){
  
  // MAKE MODELS AVAILABLE ON THE EXPRESS OBJECT
  app.set('models', db.models);
  
  // USE MIDDLEWARE
  // TODO: replace dummy auth
  app.set('user', {
    username: 'eliot'
  });
  
  // add our dummy user to db
  db.models.User.create({
    username: 'eliot',
    displayname: 'eze'
  });

  app.use(session({ secret: config.secret}));
  app.use(bodyParser.json());
  // uses busboy to convert image to buffer
  app.use(fileToBuffer);
  app.use(isLoggedIn);

  // ROUTING
  var routes = require('./routes')(app);

  // START SERVER
  var port = config.port || 8080;
  http.createServer(app).listen(port); 
});
