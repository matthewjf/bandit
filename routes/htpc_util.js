var http = require('http');
var htpcCommands;
var URL = 'http://htpc.local/';

var getCommands = function(callback) {
  if (htpcCommands && callback) callback(null, htpcCommands, true);
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
        if (callback) callback(error);
        return;
      }

      res.setEncoding('utf8');
      var rawData = '';
      res.on('data', function(chunk) { rawData += chunk; });
      res.on('end', function() {
        try {
          htpcCommands = JSON.parse(rawData);
          if (callback) callback(null, htpcCommands);
        } catch (e) {
          console.log(e.message);
          if (callback) callback(e);
        }
      });
    }).on('error', function(e) {
      console.log('Got error: ' + e.message);
      if (callback) callback(e);
    });
};

var sendCommand = function(cmd) {
  http.get(URL + '?' + cmd, function(res) {});
};

var sendStartCommand = function(cmd) {
  // does not return a response
  http.get(URL + '?' + cmd + '&withoutRelease', function(res) {});
};

var sendStopCommand = function() {
  http.get(URL + '?' + 'ButtonReleased', function(res) {});
};

// TODO: handle errors

module.exports = {
  getCommands: getCommands,
  sendCommand: sendCommand
};
