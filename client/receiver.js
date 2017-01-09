import React from 'react';
import Base from './base';
import Button from './button';

class Receiver extends Base {
  pcClick() {
    $.get('/api/remotes/receiver/KEY_DVD');
  }

  psClick() {
    $.get('/api/remotes/receiver/KEY_GAMES');
  }

  castClick() {
    $.get('/api/remotes/receiver/KEY_SAT');
  }

  render() {
    return (
      <div id='receiver' className='row' >
        <Button buttonClass='grey-8' text='PC' click={this.pcClick}/>
        <Button buttonClass='grey-8' text='PS4' click={this.psClick}/>
        <Button buttonClass='grey-8' text='CAST' click={this.castClick}/>
      </div>
    );
  }
}

export default Receiver;
