var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// APP
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

// LIRC NODE
var lircNode = require('lirc_node');
lircNode.init();

// ROUTES
var router = express.Router();

router.route('/').get(function(req, res) {
  res.status(200).json(lircNode.remotes);
});

router.route('/list').get(function(req, res) {
  res.status(200).json(Object.keys(lircNode.remotes));
});

router.route('/list/:remote').get(function(req, res) {
  res.status(200).json(lircNode.remotes[req.params.remote]);
});

router.route('/remotes/:remote/:command').get(function(req, res) {
  lircNode.irsend.send_once(req.params.remote, req.params.command, function (err, stdout, stderr) {
    res.status(200).json('ok');
  });
});

router.route('/remotes/:remote/:command/send_start').get(function(req, res) {
  lircNode.irsend.send_start(req.params.remote, req.params.command, function (err, stdout, stderr) {
    res.status(200).json('ok');
  });
});

router.route('/remotes/:remote/:command/send_stop').get(function(req, res) {
  lircNode.irsend.send_stop(req.params.remote, req.params.command, function (err, stdout, stderr) {
    res.status(200).json('ok');
  });
});

app.use('/api', router);

// START
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
