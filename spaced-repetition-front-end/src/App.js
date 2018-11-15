import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Callback from './auth/Callback';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import Auth from './auth/Auth';
import data from './dummyData';
import './App.css';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class makeMainRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      decks: [],
    };
  }

  handleData = () => {
    this.setState({
      cards: data.cards,
      decks: data.decks,
    });
  }

  render() {
    return (
      <AppWrapper>
        <Route path="/" render={props => <Header auth={auth} {...props} />} />
        <Switch>
          <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
          <Route exact path="/dashboard" render={props => <Wrapper auth={auth} handleData={this.handleData} {...props} />} />
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
                <DeckList decks={this.state.decks} />
              </Wrapper>
            )}
          />
          <Route
            path="/dashboard/cards"
            render={props => (
              <Wrapper auth={auth} handleData={this.handleData} {...props}>
                <CardList cards={this.state.cards} />
              </Wrapper>
            )}
          />
        </Switch>
      </AppWrapper>
    );
  }

};

export default makeMainRoutes;

// styles
const AppWrapper = styled.div`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  background: ${props => props.theme.dark.bodyBackground};
  color: white;
`;
