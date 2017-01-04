var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var util = require('./htpc_util');

var HTPC_STATUS = 0;
var commands = [];

// get all commands
router.route('/htpc').get(function(req, res) {
  util.getCommands(function(err, cmds, cached) {
    if (err) HTPC_STATUS = 0;
    if (!cached) { // first request
      HTPC_STATUS = 1;
      for (var ctx in cmds)
        if (cmds.hasOwnProperty(ctx))
          cmds[ctx].forEach(function(cmd) {
            commands.push({
              context: 'htpc',
              subcontext: ctx,
              label: cmd,
              url: '/api/htpc/' + ctx + '/' + cmd
            });
          });
    }

    var json = HTPC_STATUS ? cmds : {};
    res.status(200).json(json);
  });
});

router.route('/htpc/status').get(function(req, res) {
  res.status(200).json({status: HTPC_STATUS});
});

router.route('/htpc/wake').get(function(req, res) {
  exec('wakeonlan htpc', function(err) {
    if (err) HTPC_STATUS = 0;
    else HTPC_STATUS = 1;
  });

  res.status(200).json({status: 'ok'});
});

router.route('/htpc/:context/:command').get(function(req, res) {
  var ctx = req.params.context, cmd = req.params.command;
  util.getCommands(function(err, cmds) {
    if (cmds && cmds[ctx] && cmds[ctx].indexOf(cmd) !== -1) {
      util.sendCommand(ctx + cmd);
      res.status(200).json({status: 'ok'});
    } else {
      res.status(404).json({err: 'not found'});
    }
  });
});

commands.push({context: 'htpc', label: 'wake', url: '/api/htpc/wake'});

// PRIVATE API
// Let HTPC tell bandit when it wakes and sleeps
router.route('/htpc/awake_').get(function(req, res) {
  HTPC_STATUS = 1;
});

router.route('/htpc/asleep_').get(function(req, res) {
  HTPC_STATUS = 0;
});

module.exports = {commands: commands, router: router, htpcStatus: HTPC_STATUS};
