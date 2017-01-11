import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }

  renderIcon() {
    if (this.props.icon)
      return <i className={`material-icons ${this.props.iconClass || ''}`}>
        {this.props.icon}
      </i>;
    else
      return null;
  }

  handleClick(e) {
    if (this.props.click) {
      e.stopPropagation();
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate(100);
      this.props.click(e);
    }
  }

  handleDown(e) {
    if (this.props.down) {
      e.stopPropagation();
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate(60000);
      this.props.down(e);
    }
  }

  handleUp(e) {
    if (this.props.up) {
      e.stopPropagation();
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate(0);
      this.props.up(e);
    }
  }

  handleMove(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <button
          id={this.props.id}
          className={`${this.props.buttonClass}${this.props.text ? ' inline-block' : ''}`}
          onClick={this.handleClick}
          onMouseDown={this.handleDown}
          onTouchStart={this.handleDown}
          onMouseUp={this.handleUp}
          onTouchEnd={this.handleUp}
          onTouchCancel={this.handleUp}
          onTouchMove={this.handleMove} >
        {this.renderIcon()}
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  buttonClass: React.PropTypes.string,
  text: React.PropTypes.string,
  iconClass: React.PropTypes.string,
  icon: React.PropTypes.string,
  id: React.PropTypes.string,
  down: React.PropTypes.func,
  up: React.PropTypes.func,
  click: React.PropTypes.func
};

export default Button;
