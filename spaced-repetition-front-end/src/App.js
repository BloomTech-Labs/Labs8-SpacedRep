import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './components/auth/config';
import RegistrationForm from './components/auth/RegistrationForm';
import Login from './components/auth/Login';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import data from './dummyData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      decks: [],
    };
  }

  componentDidMount() {
    this.setState({
      cards: data.cards,
      decks: data.decks,
    });
  }

  onAuthRequired() {
    this.history.push('/login');
  }

  render() {
    const { decks, cards } = this.state;
    return (
      <Security {...config} onAuthRequired={this.onAuthRequired}>
        <div className="container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" render={() => <Login baseUrl={config.url} />} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <SecureRoute exact path="/dashboard" component={Wrapper} />
            <SecureRoute
              path="/dashboard/decks"
              render={props => (
                <Wrapper {...props}>
                  <DeckList decks={decks} />
                </Wrapper>
              )}
            />
            <SecureRoute
              path="/dashboard/cards"
              render={props => (
                <Wrapper {...props}>
                  <CardList cards={cards} />
                </Wrapper>
              )}
            />
          </Switch>
        </div>
      </Security>
    );
  }
}

export default withRouter(App);
