import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
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

  render() {
    const { decks, cards } = this.state;
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Wrapper} />
          <Route
            path="/dashboard/decks"
            render={props => (
              <Wrapper {...props}>
                <DeckList decks={decks} />
              </Wrapper>
            )}
          />
          <Route
            path="/dashboard/cards"
            render={props => (
              <Wrapper {...props}>
                <CardList cards={cards} />
              </Wrapper>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
