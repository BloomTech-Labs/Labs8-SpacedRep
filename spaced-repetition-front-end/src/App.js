import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import './App.css';

class App extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="container">
        <Wrapper>
          <Switch>
            <Route exact path='/' component={DeckList}/>
            <Route path='/decks' component={DeckList}/>
            <Route path='/cards' component={CardList}/>
          </Switch>
        </Wrapper>
      </div>
    );
  }
}

export default withRouter(App);
