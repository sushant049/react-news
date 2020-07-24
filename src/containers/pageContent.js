import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import NewsDetails from '../pages/newsDetails';

export default class PageContent extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/news-details/:newsTitle" component={NewsDetails} />
      </Switch>
    )
  }
}