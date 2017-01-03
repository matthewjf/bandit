var http = require('http');
var htpcCommands;
var URL = 'http://htpc.local/';

var getCommands = function(callback) {
  if (htpcCommands) callback(null, htpcCommands);
  else
    http.get(URL, function(res) {
      var error;
      if (res.statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          'Status Code:' + res.statusCode);
      } else if (!/^application\/json/.test(res.headers['content-type'])) {
        error = new Error('Invalid content-type.\n' +
                'Expected application/json but received ' + res.contentType);
      }
      if (error) {
        console.log(error.message);
        callback(error);
        return;
      }

      res.setEncoding('utf8');
      var rawData = '';
      res.on('data', function(chunk) { rawData += chunk; });
      res.on('end', function() {
        try {
          htpcCommands = JSON.parse(rawData);
          callback(null, htpcCommands);
        } catch (e) {
          console.log(e.message);
          callback(e);
        }
      });
    }).on('error', function(e) {
      console.log('Got error: ' + e.message);
      callback(e);
    });
};

var sendCommand = function(cmd) {
  http.get(URL + '?' + cmd, function(res) {});
};

// TODO: handle repetition
// TODO: handle errors

module.exports = {
  getCommands: getCommands,
  sendCommand: sendCommand
};
