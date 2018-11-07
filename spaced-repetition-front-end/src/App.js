import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Wrapper from './components/Wrapper';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import './App.css';

import data from './dummyData';

class App extends Component {
  state = {
    cards: [],
    decks: []
  }

  componentDidMount(){
    this.setState({ cards: data.cards,
                    decks: data.decks });
  }

  render() {
    return (
      <div className="container">

        <Wrapper>

          <Switch>

            <Route exact path='/' component={LandingPage}/>

            <Route path='/decks' render = { (props) =>
                <DeckList decks = {this.state.decks}
                />
              }
            />

            <Route path='/cards' render = { (props) =>
                <CardList cards = {this.state.cards}
                />
              }
            />

          </Switch>

        </Wrapper>

      </div>
    );
  }
}

export default withRouter(App);
