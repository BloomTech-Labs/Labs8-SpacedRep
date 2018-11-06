import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './components/auth/config';
import Login from './components/auth/Login';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import './App.css';

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Security
        {...config}
        onAuthRequired={onAuthRequired}
      >
        <div className="container">
          <Route path='/landing' component={LandingPage} />
          <Route path='/login' render={() => <Login baseUrl={config.url} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <SecureRoute exact path='/' component={Wrapper} />
        </div>
      </Security>
    );
  }
}

export default withRouter(App);
