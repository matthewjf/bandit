import React from 'react';
import Base from './base';
import Button from './button';

class Volume extends Base {
  volumeDown() {
    $.get('/api/remotes/receiver/KEY_VOLUMEDOWN/start');
  }

  volumeUp() {
    $.get('/api/remotes/receiver/KEY_VOLUMEDOWN/stop');
  }

  render() {
    return (
      <div id='volume' className='row' >
        <Button buttonClass='grey-8' icon='volume_down' />
        <Button buttonClass='grey-8' icon='volume_up' />
      </div>
    );
  }
}

export default Volume;
