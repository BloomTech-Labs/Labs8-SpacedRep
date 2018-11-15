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
import CardList from './components/CardList';
import Profile from './components/Profile';
import data from './dummyData';
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
      cards: [],
      decks: [],
    };
  }

  handleData = () => {
    // this.setState({
    //   cards: data.cards,
    //   decks: data.decks,
    // });
    // const { getAccessToken } = this.props.auth;
    const AccessToken = localStorage.getItem('id_token');
    const API_URL = 'http://localhost:4242';
    const headers = { Authorization: `Bearer ${AccessToken}` };
    const user = 3;
    const { decks } = this.state;
    axios.get(`${API_URL}/api/decks/${user}`, { headers })
      .then(response => (
        this.setState({
          decks: [...decks, response.data],
        })
      ))
      .catch(error => console.log({ Error: error }));
  }

  render() {
    const { decks, cards } = this.state;
    return (
      <AppWrapper>
        <Route path="/" render={props => <Header auth={auth} {...props} />} />
        <Switch>
          <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
          <Route exact path="/dashboard" render={props => <Wrapper auth={auth} handleData={this.handleData} {...props} />} />
          <Route exact path="/dashboard/profile" render={props => <Profile auth={auth} {...props} />} />
          <Route
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route
            path="/dashboard/decks"
            render={props => (
              <Wrapper {...props} auth={auth} handleData={this.handleData}>
                <DeckList decks={decks} />
              </Wrapper>
            )}
          />
          <Route
            path="/dashboard/cards"
            render={props => (
              <Wrapper auth={auth} handleData={this.handleData} {...props}>
                <CardList cards={cards} />
              </Wrapper>
            )}
          />
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
