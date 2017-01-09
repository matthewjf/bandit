import React from 'react';
import Base from './base';
import Button from './button';

class Volume extends Base {

  render() {
    return (
      <div id='volume' className='row' >
        <button className='b-grey-4 grey-8'><i className="material-icons">volume_down</i></button>
        <button className='b-grey-4 grey-8'><i className="material-icons">volume_up</i></button>
      </div>
    );
  }
}

export default Volume;
