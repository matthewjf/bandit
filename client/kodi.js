import React from 'react';
import Base from './base';
import Button from './button';
import {kodiStart, kodiClick, kodiStop} from './util';

class Kodi extends Base {
  handleKodi() {
    $.get('/api/htpc/htpc/kodi');
  }

  render() {
    return (
      <div id='kodi' className='row' >
        <button onClick={this.handleKodi} className='grey-6'><img src='/kodi-logo.png'></img></button>
        <Button click={kodiClick('subtitles')} buttonClass='grey-6' icon='chat_bubble_outline'/>
        <Button click={kodiClick('update_videos')} buttonClass='grey-6' icon='file_upload'/>
      </div>
    );
  }
}

export default Kodi;
