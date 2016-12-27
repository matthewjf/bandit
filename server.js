var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

/**********************
  MIDDLEWARE
**********************/
app.set('port', 3000);
app.use('/public', express.static('public'));

/**********************
  LIRC NODE
**********************/
var lirc = require('lirc_node');
lirc.init();

/**********************
  ROUTES
**********************/
var execCB = function(res) {
  return function(err, stdout, stderr) {
    if (err) res.status(400).json({err: err, stdout: stdout, stderr: stderr});
    else res.status(200).json({ status: 'ok', stdout: stdout });
  };
};

// basic index for testing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// shutdown raspberry pi
var exec = require('child_process').exec;
app.get('/shutdown', function(req, res) {
  exec('shutdown now', execCB);
});

/**********************
  API
**********************/
var router = express.Router();

// list all commands
router.route('/').get(function(req, res) {
  if (lirc.remotes) res.status(200).json(lirc.remotes);
  else res.status(404).json({err: 'no remotes found'});
});

// list remotes
router.route('/remotes').get(function(req, res) {
  if (lirc.remotes) res.status(200).json(Object.keys(lirc.remotes));
  else res.status(404).json({err: 'no remotes found'});
});

// list remote commands
router.route('/remotes/:remote').get(function(req, res) {
  var remote = lirc.remotes[req.params.remote];
  if (remote) res.status(200).json(lirc.remotes[req.params.remote]);
  else res.status(404).json({err: 'not found'});
});

// send remote command once
router.route('/remotes/:remote/:command').get(function(req, res) {
  lirc.irsend.send_once(req.params.remote, req.params.command, execCB(res));
});

// send remote command repeatedly
router.route('/remotes/:remote/:command/start').get(function(req, res) {
  lirc.irsend.send_start(req.params.remote, req.params.command, execCB(res));
});

// stop remote command sending
router.route('/remotes/:remote/:command/stop').get(function(req, res) {
  lirc.irsend.send_stop(req.params.remote, req.params.command, execCB(res));
});

// initialize htpc commands
var htpc = require('./htpc');

// get all commands
router.route('/htpc').get(function(req, res) {
  htpc.getCommands(function(cmds) {
    res.status(200).json(cmds);
  });
});

router.route('/htpc/wake').get(function(req, res) {
  exec('wakeonlan htpc', execCB);
});

router.route('/htpc/:context/:command').get(function(req, res) {
  var ctx = req.params.context, cmd = req.params.command;
  htpc.getCommands(function(commands) {
    if (commands && commands[ctx] && commands[ctx].indexOf(cmd) !== -1) {
      htpc.sendCommand(ctx + cmd);
      res.status(200).json({status: 'ok'});
    } else {
      res.status(404).json({err: 'not found'});
    }
  });
});

app.use('/api', router);

/**********************
  START SERVER
**********************/
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
