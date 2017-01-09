import React from 'react';
import Base from './base';
import Button from './button';
import {kodiStart, kodiClick, kodiStop} from './util';

class Media extends Base {

  render() {
    return (
      <div id='media'>

        <div className='row' >
          <Button iconClass="grey-6" icon='skip_previous' down={kodiStart('small_skip_bck')} up={kodiStop()}/>
          <Button iconClass="green" icon='play_arrow' click={kodiClick('play')}/>
          <Button iconClass="grey-6" icon='skip_next' down={kodiStart('small_skip_fwd')} up={kodiStop()}/>
        </div>

        <div className='row' >
          <Button iconClass="grey-6" icon='fast_rewind' down={kodiStart('big_skip_bck')} up={kodiStop()}/>
          <Button iconClass="red" icon='stop' click={kodiClick('stop')}/>
          <Button iconClass="grey-6" icon='fast_forward' down={kodiStart('big_skip_fwd')} up={kodiStop()}/>
        </div>

      </div>
    );
  }
}

export default Media;
