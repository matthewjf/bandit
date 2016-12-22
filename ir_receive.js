var spawn = require('child_process').spawn;
var data = { out: [], err: [] };
var res;

var startRecord = function(response) {
  res = response;

  var cmds = [
    "sudo /etc/init.d/lirc stop\n",
    "irrecord -d /dev/lirc0 ~/lircd.conf\n",
    "\n"
  ];

  var child = spawn('bash');
  child.stdin.setEncoding('utf-8');

  child.stdout.on('data', function(buffer) {
    data.out.push(buffer.toString('utf8'));
  });

  child.stderr.on('data', function(buffer) {
    data.err.push(buffer.toString('utf8'));
  });

  child.on('close', function(code) {
    console.log('exited with code: ', code);
    // data = { out: [], err: [] };
  });

  cmds.forEach(function(cmd) {
    console.log('running command: ', cmd);
    child.stdin.write(cmd);
  });
  setTimeout(function() {
    res.status(200).json(data);
    child.stdin.end();
  }, 1000);
};

module.exports = {
  startRecord: startRecord
};
