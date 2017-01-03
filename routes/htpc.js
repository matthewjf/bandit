var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var util = require('./htpc_util');

var commands = [];

// get all commands
router.route('/htpc').get(function(req, res) {
  util.getCommands(function(err, cmds) {
    if (err)
      res.status(404).json({htpc: ['could not connect to htpc']});
    else {
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

      res.status(200).json(cmds);
    }
  });
});

router.route('/htpc/wake').get(function(req, res) {
  exec('wakeonlan htpc');
});

router.route('/htpc/:context/:command').get(function(req, res) {
  var ctx = req.params.context, cmd = req.params.command;
  util.getCommands(function(cmds) {
    if (cmds && cmds[ctx] && cmds[ctx].indexOf(cmd) !== -1) {
      util.sendCommand(ctx + cmd);
      res.status(200).json({status: 'ok'});
    } else {
      res.status(404).json({err: 'not found'});
    }
  });
});

commands.push({context: 'htpc', label: 'wake', url: '/api/htpc/wake'});

module.exports = {commands: commands, router: router};
