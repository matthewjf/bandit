import React from 'react';

class Base extends React.Component {
  componentWillReceiveProps(props) {
    this.setState({commands: props.commands});
  }

  stop(cb) {
    $.get('/api/htpc/stop', cb);
  }
}

export default Base;
