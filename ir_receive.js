var spawn = require('child_process').spawn;
var res;
spawn.stdout.on('data', function(data) {
  if (res) res.status(200).json(data);
});

spawn.on('exit', function(code) {
  if (res) res.status(200).json('exit');
});

var startRecord = function(response) {
  res = response;
  var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  spawn.stdin.write(cmd);
};

module.exports = {
  startRecord: startRecord
};
