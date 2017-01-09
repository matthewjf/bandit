var express = require('express');
var router = express.Router();

var lirc = require('lirc_node');
lirc.init();

var execCB = function(res) {
  return function(err, stdout, stderr) {
    if (err) res.status(404).json({err: err, stdout: stdout, stderr: stderr});
    else res.status(200).json({ status: 'ok', stdout: stdout });
  };
};

/**********************
  REMOTES
**********************/

// list remotes
router.route('/remotes').get(function(req, res) {
  if (lirc.remotes) res.status(200).json(lirc.remotes);
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

// remote: [{label, url}]
var commands = lirc.remotes || {};

module.exports = {commands: commands, router: router};
