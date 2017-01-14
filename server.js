var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var cors = require('cors');

/**********************
  MIDDLEWARE
**********************/
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

/**********************
  ROUTES
**********************/
var router = express.Router();

// browser control
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

var pi = require('./routes/pi');
app.use(pi.router);

var remote = require('./routes/remote');
app.use('/api', remote.router);

var htpc = require('./routes/htpc');
app.use('/api', htpc.router);

// // list all commands
app.get('/api', function(req, res) {
  res.status(200).json({
    pi: pi.commands,
    api: {
      htpc: htpc.commands,
      remotes: remote.commands
    }
  });
});

/**********************
  START
**********************/

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
