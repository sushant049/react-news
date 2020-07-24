import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppHeader from './header';
import PageContent from './pageContent';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <AppHeader />
          <PageContent />
        </Router>
      </>
    )
  }
}

export default App;