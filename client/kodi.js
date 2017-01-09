import React from 'react';
import Base from './base';
import Button from './button';
import {kodiStart, kodiClick, kodiStop} from './util';

class Kodi extends Base {
  handleKodi() {
    $.get('/api/htpc/htpc/toggle_kodi');
  }

  render() {
    return (
      <div id='kodi' className='row' >
        <button onClick={this.handleKodi} className='b-grey-2 grey-8'><img src='/kodi-logo.png'></img></button>
        <Button click={kodiClick('subtitles')} buttonClass='b-grey-2 grey-8' icon='chat_bubble_outline'/>
        <Button click={kodiClick('update_videos')} buttonClass='b-grey-2 grey-8' icon='file_upload'/>
      </div>
    );
  }
}

export default Kodi;
