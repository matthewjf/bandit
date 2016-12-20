var jsonfile = require('jsonfile');
var file = './remotes.json';
var remotes = jsonfile.readFileSync(file);

module.exports = {
  all: function() { return remotes; },
  list: function() { return Object.keys(remotes); },
  get: function(remote) { return remotes[remote]; },
  write: function(remote, commands, callbacks) {
    remotes[remote] = commands;
    jsonfile.writeFile(file, remotes, {spaces: 2}, function(err) {
      if (err) callbacks.error(err);
      else callbacks.success();
    });
  },
};
