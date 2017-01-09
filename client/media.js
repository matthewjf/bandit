import Base from './base';

class Media extends Base {

  render() {
    return (
      <div id='media'>

        <div className='row' >
          <button className='b-grey-2'><i className="grey-6 material-icons">skip_previous</i></button>
          <button className='b-grey-2'><i className="green material-icons">play_arrow</i></button>
          <button className='b-grey-2'><i className="grey-6 material-icons">skip_next</i></button>
        </div>

        <div className='row' >
          <button className='b-grey-2'><i className="grey-6 material-icons">fast_rewind</i></button>
          <button className='b-grey-2'><i className="red material-icons">stop</i></button>
          <button className='b-grey-2'><i className="grey-6 material-icons">fast_forward</i></button>
        </div>

      </div>
    );
  }
}

export default Media;
