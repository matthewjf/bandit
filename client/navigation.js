import React from 'react';
import Base from './base';
import Button from './button';

function kodiStart(cmd) {
  $.get(`/api/htpc/kodi/${cmd}/start`);
}

function kodiClick(cmd) {
  $.get(`/api/htpc/kodi/${cmd}`);
}


class Navigation extends Base {

  handleSelect() {
    $.get('/api/htpc/kodi/select/start');
  }

  handleUp() {
    kodiStart('up');
  }

  handleDown() {
    kodiStart('down');
  }

  handleLeft() {
    kodiStart('left');
  }

  handleRight() {
    kodiStart('right');
  }

  handleContext() {
    kodiClick('context_menu');
  }

  handlePrev() {
    kodiClick('previous');
  }

  handleInfo() {
    kodiClick('info');
  }

  handleReturn() {
    kodiClick('return');
  }

  render() {
    return (
      <div id='navigation'>

        <div className='row' >
          <Button buttonClass='b-grey-2' click={this.handleContext} iconClass="grey-6 small" icon='more_vert' />
          <Button buttonClass='b-grey-0' down={this.handleUp} up={this.stop} iconClass="grey-6" icon='keyboard_arrow_up' />
          <Button buttonClass='b-grey-2' click={this.handlePrev} iconClass="grey-6 small" icon='keyboard_backspace' />
        </div>

        <div className='row' >
          <Button buttonClass='b-grey-0' down={this.handleLeft} up={this.stop} iconClass="grey-6" icon='keyboard_arrow_left' />
          <Button buttonClass='b-grey-0' down={this.handleSelect} up={this.stop} iconClass="grey-6" icon='radio_button_unchecked' />
          <Button buttonClass='b-grey-0' down={this.handleRight} up={this.stop} iconClass="grey-6" icon='keyboard_arrow_right' />
        </div>

        <div className='row' >
          <Button buttonClass='b-grey-2' click={this.handleInfo} iconClass="grey-6 small" icon='info_outline' />
          <Button buttonClass='b-grey-0' down={this.handleDown} up={this.stop} iconClass="grey-6" icon='keyboard_arrow_down' />
          <Button buttonClass='b-grey-2' click={this.handleReturn} iconClass="grey-6 small" icon='keyboard_return' />
        </div>

      </div>
    );
  }
}

export default Navigation;
