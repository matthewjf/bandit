var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

/**********************
  PI
**********************/

router.route('/pi/shutdown').get(function(req, res) {
  exec('shutdown now');
  res.status(200).json({status: 'ok'});
});

router.route('/pi/reboot').get(function(req, res) {
  exec('reboot');
  res.status(200).json({status: 'ok'});
});

var commands = {
  shutdown: null,
  reboot: null
};

module.exports = {commands: commands, router: router};
