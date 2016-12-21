var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// APP
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

// LIRC NODE
var lirc = require('lirc_node');
lirc.init();

// ROUTES
var router = express.Router();

router.route('/').get(function(req, res) {
  res.status(200).json(lirc.remotes);
});

router.route('/remotes').get(function(req, res) {
  res.status(200).json(Object.keys(lirc.remotes));
});

router.route('/remotes/:remote').get(function(req, res) {
  res.status(200).json(lirc.remotes[req.params.remote]);
});

var irsendCB = function(res) {
  return function(err, stdout, stderr) {
    if (err) res.status(400).json({err: err, stdout: stdout, stderr: stderr});
    else res.status(200).json({stdout: stdout});
  };
};

router.route('/remotes/:remote/:command').get(function(req, res) {
  lirc.irsend.send_once(req.params.remote, req.params.command, irsendCB(res));
});

router.route('/remotes/:remote/:command/start').get(function(req, res) {
  lirc.irsend.send_start(req.params.remote, req.params.command, irsendCB(res));
});

router.route('/remotes/:remote/:command/stop').get(function(req, res) {
  lirc.irsend.send_stop(req.params.remote, req.params.command, irsendCB(res));
});

app.use('/api', router);

// START
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
