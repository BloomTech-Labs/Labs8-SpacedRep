import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Auth from './auth/Auth';
import Callback from './auth/Callback';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import Wrapper from './components/Wrapper';
import Profile from './components/Profile';
import Billing from './components/Billing';
import AddDeck from './components/AddDeck';
import CardInputs from './components/CardInputs';

import './App.css';

/**
 * Creates a new instance of the Auth module.
 * Gives components access to all Auth methods needed for authentication.
 */
const auth = new Auth();

/**
 * Called when an authentication event is triggered. Auth0 responds with an access token, id token,
 * and token expiration upon success. handleAuthentication() in App.js parses the URI for the
 * access token and id token, then calls handleAuthentication() of the auth instance if present.
 *
 * @param {location} * Current URI
 */
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      profile: null,
      errorMessage: '', // better to add redux or pass the same error props everywhere?
    };
  }

  // Calls auth's getProfile and responds with the profile associated with the identity provider
  // used (e.g. The username/password profile response will be somewhat different than Google's)
  handleProfile = async () => {
    try {
      await auth.getProfile();
      this.setState({
        profile: auth.userProfile,
      });
    } catch (error) {
      console.log('handleProfile failed: ', error);
    }
  }

  handleData = () => {
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`${process.env.REACT_APP_URL}/api/decks/`, { headers })
      .then(response => (
        this.setState({ decks: response.data })
      ))
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
  }

  render() {
    const { decks, profile } = this.state;
    return (
      <AppWrapper>
        <Route path="/" render={props => <Header auth={auth} {...props} />} />

        <Switch>

          <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />

          <Route
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />

          <Wrapper auth={auth} handleProfile={this.handleProfile} handleData={this.handleData}>
            <Route exact path="/dashboard" />
            <Route exact path="/dashboard/profile" render={props => <Profile profile={profile} {...props} />} />
            <Route exact path="/dashboard/decks" render={props => <DeckList decks={decks} {...props} />} />
            <Route exact path="/dashboard/billing" render={props => <Billing profile={profile} {...props} />} />
            <Route exact path="/dashboard/add-deck" render={props => <AddDeck profile={profile} {...props} />} />
            <Route exact path="/dashboard/add-card" render={props => <CardInputs profile={profile} {...props} />} />
          </Wrapper>

        </Switch>

      </AppWrapper>
    );
  }
}

export default App;

// styles
const AppWrapper = styled.div`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  background: ${props => props.theme.dark.bodyBackground};
  color: white;
`;
