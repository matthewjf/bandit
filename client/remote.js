import React from 'react';
import Power from './power';
import Receiver from './receiver';
import Navigation from './navigation';
import Media from './media';
import Kodi from './kodi';
import Volume from './volume';

class Remote extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    $.get('/api', (commands) => {
      this.setState({commands: commands});
    });
    window.scrollTo(0,document.body.scrollHeight);
  }

  render() {
    return (
      <main>
        <Power commands={this.state.commands}/>
        <Receiver commands={this.state.commands}/>
        <Kodi commands={this.state.commands}/>
        <Navigation commands={this.state.commands}/>
        <Media commands={this.state.commands}/>
        <Volume commands={this.state.commands}/>
      </main>
    );
  }
}

export default Remote;
