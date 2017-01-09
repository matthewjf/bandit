import Base from './base';

class Kodi extends Base {

  render() {
    return (
      <div id='kodi' className='row' >
        <button className='b-grey-2 grey-8'><img src='/kodi-logo.png'></img></button>
        <button className='b-grey-2 grey-8'><i className="material-icons">chat_bubble_outline</i></button>
        <button className='b-grey-2 grey-8'><i className="material-icons">file_upload</i></button>
      </div>
    );
  }
}

export default Kodi;
