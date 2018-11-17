'use strict';

import React from 'react';
import AppRouter from './AppRouter.jsx';

import * as debug from 'debug';
debug.enable('*');// ('component:*');

const mainStyle = {
  width: '50%',
  margin: 'auto'
};

class App extends React.Component {
  render() {
    return (
      <main style={mainStyle}>
        <AppRouter />
      </main>
    );
  }
}

export default App;
