import Base from './base';

class Navigation extends Base {
  kodiStart(cmd) {
    $.get(`/api/htpc/kodi/${cmd}/start`);
  }

  kodiClick(cmd) {
    $.get(`/api/htpc/kodi/${cmd}`);
  }

  select() {
    this.kodiStart('select');
  }

  up() {
    this.kodiStart('up');
  }

  down() {
    this.kodiStart('down');
  }

  left() {
    this.kodiStart('left');
  }

  right() {
    this.kodiStart('right');
  }

  context() {
    
  }

  prev() {

  }

  info() {

  }

  return() {

  }

  render() {
    return (
      <div id='navigation'>

        <div className='row' >
          <button className='b-grey-2' click={this.context}><i className="grey-6 material-icons small">more_vert</i></button>
          <button className='b-grey-0' down={this.up} up={this.stop}><i className="grey-6 material-icons">keyboard_arrow_up</i></button>
          <button className='b-grey-2' click={this.prev}><i className="grey-6 material-icons small">keyboard_backspace</i></button>
        </div>

        <div className='row' >
          <button className='b-grey-0' down={this.left} up={this.stop}><i className="grey-6 material-icons">keyboard_arrow_left</i></button>
          <button className='b-grey-0' down={this.select} up={this.stop}><i className="grey-6 material-icons">radio_button_unchecked</i></button>
          <button className='b-grey-0' down={this.right} up={this.stop}><i className="grey-6 material-icons">keyboard_arrow_right</i></button>
        </div>

        <div className='row' >
          <button className='b-grey-2' click={this.info}><i className="grey-6 material-icons small">info_outline</i></button>
          <button className='b-grey-0' down={this.down} up={this.stop}><i className="grey-6 material-icons">keyboard_arrow_down</i></button>
          <button className='b-grey-2' click={this.return}><i className="grey-6 material-icons small">keyboard_return</i></button>
        </div>

      </div>
    );
  }
}

export default Navigation;
