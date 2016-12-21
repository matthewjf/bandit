var spawn = require('child_process').spawn;
var data = {};
var res;

var startRecord = function(response) {
  res = response;
  var cmd = "irrecord -d /dev/lirc0 ~/lircd.conf\n";
  var child = spawn('bash');
  child.stdin.setEncoding('utf-8');
  
  child.stdout.on('data', function(output) {
    data = output;
  });

  child.stdout.on('close', function(code) {
    console.log('exited with code: ', code);
  });

  child.stdin.write(cmd);
  child.stdin.write('\n');

  child.stdin.end();

  res.status(200).json(data);
};

module.exports = {
  startRecord: startRecord
};
