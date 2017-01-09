export function kodiStart(cmd) {
  return function() {
    $.get(`/api/htpc/kodi/${cmd}/start`);
  };
}

export function kodiStop(cmd) {
  return function() {
    $.get('/api/htpc/stop');
  };
}

export function kodiClick(cmd) {
  return function() {
    $.get(`/api/htpc/kodi/${cmd}`);
  };
}
