var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 ) {
    if (xhr.status === 200) {
      var div = document.getElementById("app");
      var remotes = JSON.parse(xhr.responseText);
      if (remotes['irsend: command not found']) {
        div.innerHTML = 'irsend: command not found';
      } else {
        var frag = document.createDocumentFragment();
        Object.keys(remotes).forEach(function(remote) {
          remotes[remote].forEach(function(cmd) {
            var link = document.createElement("a");
            var text = document.createTextNode(remote + ': ' + cmd);
            link.appendChild(text);
            link.title = text;
            link.href = '/remotes/' + remote + '/' + cmd;
            frag.appendChild(link);
          });
        });
        div.appendChild(frag);
      }
    } else if (xhr.status === 400) {
      alert('There was an error 400');
    } else {
      alert('something else other than 200 was returned');
    }
  }
};

xhr.open("GET", "/api", true);
xhr.send();
