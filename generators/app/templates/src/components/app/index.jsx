'use strict';

import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div id="content">
        <h1>It's work!</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

export default App;
