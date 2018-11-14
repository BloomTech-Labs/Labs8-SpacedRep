import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Callback from './auth/Callback';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import Auth from './auth/Auth';
import history from './history';
import data from './dummyData';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class makeMainRoutes extends React.Component {
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
      <div>
        <Router history={history}>
          <React.Fragment>
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
          </React.Fragment>
        </Router>
      </div>
    );
  }

};

export default makeMainRoutes;
