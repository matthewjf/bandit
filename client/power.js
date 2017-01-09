import React from 'react';
import Base from './base';
import Button from './button';

class Power extends Base {

  pcClick() {
    $.get('/api/htpc/htpc/sleep');
    $.get('/api/htpc/wake');
  }

  tvClick() {
    $.get('/api/remotes/tv/KEY_POWER');
  }

  recClick() {
    $.get('/api/remotes/receiver/KEY_POWER');
  }

  render() {
    return (
      <div id='power' className='row b-grey-0' >
        <Button id='pc_power' iconClass='lblue' icon='account_box' click={this.pcClick} />
        <Button id='tv_power' iconClass='teal' icon='tv' click={this.tvClick} />
        <Button id='rec_power' iconClass='amber' icon='surround_sound' click={this.recClick} />
        <Button id='more_opts' iconClass='grey-4' icon='settings_applications' />
      </div>
    );
  }
}

export default Power;
