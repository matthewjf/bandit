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
var remotes = require('./remotes');

router.route('/').get(function(req, res) {
  // res.status(200).json(remotes.all());
  res.status(200).json(lircNode.remotes);
});

router.route('/list').get(function(req, res) {
  res.status(200).json(remotes.list());
});

router.route('/list/:remote').get(function(req, res) {
  res.status(200).json(remotes.get(req.params.remote));
});

router.route('/remotes/:remote/:command').get(function(req, res) {
  lircNode.irsend.send_once(req.params.remote, req.params.command, function () {
    res.status(200).json('ok');
  });
});

app.use('/api', router);

// START
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
