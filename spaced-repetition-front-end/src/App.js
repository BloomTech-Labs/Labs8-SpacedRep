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
// import data from './dummyData';
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
      profile: null,
      errorMessage: '',
    };
  }

  setProfile = (err, userProfile) => {
    if (err) {
      throw new Error(err);
    } else if (userProfile) {
      this.setState({
        profile: { ...userProfile },
      });
    }
  }

  // Calls auth's getProfile and responds with the profile associated with the identity provider
  // used (e.g. The username/password profile response will be somewhat different than Google's)
  handleProfile = () => {
    auth.getProfile(this.setProfile);
  }

  handleData = () => {
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    // Thinking sub should be sent by post request instead of as param in get request for security
    // const body = { sub: this.state.profile.sub };
    const { decks } = this.state;
    const id = 1;
    const body = {
      name: 'SQL',
      public: false,
      author: 2,
    };
    axios.put(`${process.env.REACT_APP_URL}/api/decks/${id}`, body, { headers })
      .then(response => (
        this.setState({
          decks: [...decks, response.data],
        })
      ))
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
  }

  render() {
    const {
      decks, cards, profile, errorMessage,
    } = this.state;
    return (
      <AppWrapper>
        <Route path="/" render={props => <Header auth={auth} {...props} />} />
        <Switch>
          <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
          <Route exact path="/dashboard" render={props => <Wrapper errorMsg={errorMessage} profile={profile} auth={auth} handleProfile={this.handleProfile} handleData={this.handleData} {...props} />} />
          <Route exact path="/dashboard/profile" render={props => <Profile auth={auth} {...props} />} />
          <Route
            path="/callback"
            render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          {/* `/dashboard`, /dasbhoard/decks`, and `/dashboard/cards` need refactoring
          Each Wrapper route needs the same props to compile. There is probably a better way */}
          <Route
            path="/dashboard/decks"
            render={props => (
              <Wrapper
                errorMsg={errorMessage}
                profile={profile}
                auth={auth}
                handleProfile={this.handleProfile}
                handleData={this.handleData}
                {...props}
              >
                <DeckList decks={decks} />
              </Wrapper>
            )}
          />
          <Route
            path="/dashboard/cards"
            render={props => (
              <Wrapper
                errorMsg={errorMessage}
                profile={profile}
                auth={auth}
                handleProfile={this.handleProfile}
                handleData={this.handleData}
                {...props}
              >
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
