import React from 'react';
import Base from './base';
import Button from './button';
import {kodiStart, kodiStop, kodiClick} from './util';

class Navigation extends Base {

  render() {
    return (
      <div id='navigation'>

        <div className='row' >
          <Button click={kodiClick('context_menu')} iconClass="grey-6 small" icon='more_vert' />
          <Button down={kodiStart('up')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_up' />
          <Button click={kodiClick('previous')} iconClass="grey-6 small" icon='keyboard_backspace' />
        </div>

        <div className='row' >
          <Button down={kodiStart('left')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_left' />
          <Button down={kodiStart('select')} up={kodiStop()} iconClass="grey-6" icon='radio_button_unchecked' />
          <Button down={kodiStart('right')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_right' />
        </div>

        <div className='row' >
          <Button click={kodiClick('info')} iconClass="grey-6 small" icon='info_outline' />
          <Button down={kodiStart('down')} up={kodiStop()} iconClass="grey-6" icon='keyboard_arrow_down' />
          <Button click={kodiClick('parent_dir')} iconClass="grey-6 small" icon='keyboard_return' />
        </div>

      </div>
    );
  }
}

export default Navigation;
