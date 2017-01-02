var main = document.getElementById("app");

/**********************
 PI COMMANDS
***********************/

var p = document.createElement('p');
var shutdown = document.createElement("a");
shutdown.appendChild(document.createTextNode('PI: shutdown'));
shutdown.href = '/pi/shutdown';
p.appendChild(shutdown);
main.appendChild(p);

p = document.createElement('p');
var reboot = document.createElement("a");
reboot.appendChild(document.createTextNode('PI: reboot'));
reboot.href = '/pi/reboot';
p.appendChild(reboot);
main.appendChild(p);

/**********************
 LIRC COMMANDS
***********************/

function handleLircReq(remotes) {
  var notFoundText = 'irsend: command not found';
  if (remotes[notFoundText]) {
    var notfound = document.createElement("p");
    notfound.innerHTML = notFoundText;
    main.appendChild(notfound);
  } else {
    var frag = document.createDocumentFragment();
    Object.keys(remotes).forEach(function(remote) {
      remotes[remote].forEach(function(cmd) {
        var link = document.createElement("a");
        var linkText = remote.toUpperCase() + ': ' + cmd.toLowerCase();
        var text = document.createTextNode(linkText);
        link.appendChild(text);
        link.title = text;
        link.href = '/api/remotes/' + remote + '/' + cmd;
        var p = document.createElement('p');
        p.appendChild(link);
        frag.appendChild(p);
      });
    });
    main.appendChild(frag);
  }
}

var lircReq = new XMLHttpRequest();

lircReq.onreadystatechange = function() {
  if (lircReq.readyState === 4 ) {
    if (lircReq.status === 200) {
      handleLircReq(JSON.parse(lircReq.responseText));
    } else if (lircReq.status === 400) {
      alert('There was an error 400');
    } else {
      alert('something else other than 200 was returned');
    }
  }
};

lircReq.open("GET", "/api/remotes", true);
lircReq.send();

/**********************
 HTPC COMMANDS
***********************/

function addHtpcWake() {
  var l = document.createElement("a");
  var t = document.createTextNode('HTPC: wake');
  l.appendChild(t);
  l.title = t;
  l.href = '/api/htpc/wake';
  main.appendChild(l);
}

function handleHtpcReq(commands) {
  addHtpcWake();

  var frag = document.createDocumentFragment();
  Object.keys(commands).forEach(function(ctx) {
    commands[ctx].forEach(function(cmd) {
      var link = document.createElement("a");
      var linkText = ctx.toUpperCase() + ': ' + cmd.toLowerCase();
      var text = document.createTextNode(linkText);
      link.appendChild(text);
      link.title = text;
      link.href = 'http://htpc.local/?' + ctx + cmd;
      link.href = '/api/htpc/' + ctx + '/' + cmd;
      var p = document.createElement('p');
      p.appendChild(link);
      frag.appendChild(p);
    });
  });
  main.appendChild(frag);
}

var htpcReq = new XMLHttpRequest();

htpcReq.onreadystatechange = function() {
  if (htpcReq.readyState === 4 ) {
    if (htpcReq.status === 200) {
      handleHtpcReq(JSON.parse(htpcReq.responseText));
    } else if (htpcReq.status === 400) {
      alert('There was an error 400');
    } else {
      alert('something else other than 200 was returned');
    }
  }
};

htpcReq.open("GET", "/api/htpc", true);
htpcReq.send();
