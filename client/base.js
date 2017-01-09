import React from 'react';

class Base extends React.Component {
  componentWillReceiveProps(props) {
    this.setState({commands: props.commands});
  }
}

export default Base;
