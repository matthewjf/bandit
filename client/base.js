import React from 'react';

class Base extends React.Component {
  componentWillReceiveProps(props) {
    this.setState({commands: props.commands});
  }

  stop() {
    $.get('/api/htpc/stop');
  }
}

export default Base;
