import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppHeader from './header';
import PageContent from './pageContent';
import Loader from '../components/loader';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Loader/>
          <AppHeader />
          <PageContent />
        </Router>
      </>
    )
  }
}

export default App;