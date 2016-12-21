var spawn = require('child_process').spawn;
var res;

var startRecord = function(response) {
  res = response;
  var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  var child = spawn(cmd);

  child.stdout.on('data', function(data) {
    if (res) res.status(200).json(data);
  });

  child.on('exit', function(code) {
    if (res) res.status(200).json('exit');
  });

  // child.stdin.write(cmd);
};

module.exports = {
  startRecord: startRecord
};
