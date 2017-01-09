import React from 'react';
import Base from './base';
import Button from './button';
import {kodiStart, kodiStop, kodiClick} from './util';

class Navigation extends Base {

  render() {
    return (
      <div id='navigation'>

        <div className='row' >
          <Button buttonClass='b-grey-2' click={kodiClick('context_menu')} iconClass="grey-6 small" icon='more_vert' />
          <Button buttonClass='b-grey-0' down={kodiStart('up')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_up' />
          <Button buttonClass='b-grey-2' click={kodiClick('previous')} iconClass="grey-6 small" icon='keyboard_backspace' />
        </div>

        <div className='row' >
          <Button buttonClass='b-grey-0' down={kodiStart('left')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_left' />
          <Button buttonClass='b-grey-0' down={kodiStart('select')} up={kodiStop()} iconClass="grey-6" icon='radio_button_unchecked' />
          <Button buttonClass='b-grey-0' down={kodiStart('right')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_right' />
        </div>

        <div className='row' >
          <Button buttonClass='b-grey-2' click={kodiClick('info')} iconClass="grey-6 small" icon='info_outline' />
          <Button buttonClass='b-grey-0' down={kodiStart('down')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_down' />
          <Button buttonClass='b-grey-2' click={kodiClick('parent_dir')} iconClass="grey-6 small" icon='keyboard_return' />
        </div>

      </div>
    );
  }
}

export default Navigation;
