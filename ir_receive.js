var spawn = require('child_process').spawn;
var res;
spawn.stdout.on('data', function(data) {
  if (res) res.status(200).json(data);
});

spawn.on('exit', function(code) {
  if (res) res.status(200).json('exit');
});

var init = function(response) {
  // takes a response object so we can send data back to client
  // maybe needs socket io to push?
  res = response;
};

var startRecord = function() {
  var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  spawn.stdin.write(cmd);
};

var irreceive = {
  init: init,
  startRecord: startRecord
};
