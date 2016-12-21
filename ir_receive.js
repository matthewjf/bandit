var spawn = require('child_process').spawn;
var res;

var startRecord = function(response) {
  res = response;
  // var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  var cmd = "\n";
  var child = spawn('bash');
  child.stdin.setEncoding('utf-8');
  child.stdout.pipe(process.stdout);
  child.stdin.write("pwd\n");
  child.stdin.end();

  res.status(200).json('ok');
};

module.exports = {
  startRecord: startRecord
};
