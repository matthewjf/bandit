import React from 'react';
import Base from './base';
import Button from './button';

class Kodi extends Base {
  handleKodi() {
    // TODO: add command to htpc
  }

  handleSubtitles() {
    $.get('/api/htpc/kodi/subtitles');
  }

  handleUpdate() {
    $.get('/api/htpc/kodi/update_videos');
  }

  render() {
    return (
      <div id='kodi' className='row' >
        <button onClick={this.handleKodi} className='b-grey-2 grey-8'><img src='/kodi-logo.png'></img></button>
        <Button click={this.handleSubtitles} buttonClass='b-grey-2 grey-8' icon='chat_bubble_outline'/>
        <Button click={this.handleUpdate} buttonClass='b-grey-2 grey-8' icon='file_upload'/>
      </div>
    );
  }
}

export default Kodi;
