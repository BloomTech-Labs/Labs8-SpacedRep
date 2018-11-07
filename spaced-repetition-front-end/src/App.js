import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './components/auth/config';
import RegistrationForm from './components/auth/RegistrationForm';
import Login from './components/auth/Login';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
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
          <Route exact path='/' component={LandingPage} />
          <Route path="/register" component={RegistrationForm} />
          <Route path='/login' render={() => <Login baseUrl={config.url} />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <SecureRoute path='/dashboard/decks' component={DeckList} />
          <SecureRoute path='/dashboard/cards' component={CardList} />
          <SecureRoute exact path='/dashboard' component={Wrapper} />
        </div>
      </Security>
    );
  }
}

export default withRouter(App);
