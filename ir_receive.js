var spawn = require('child_process').spawn;
var res;

var startRecord = function(response) {
  res = response;
  // var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  var cmd = "\n";
  var child = spawn('bash');
  child.stdout.on('data', function(data) {console.log(data);});
  child.stdin.write("pwd\n");
  child.stdin.end();
};

module.exports = {
  startRecord: startRecord
};
