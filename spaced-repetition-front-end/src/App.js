import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import Billing from './components/Billing';
import data from './dummyData';
import './App.css';
import styled from 'styled-components';

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
      <AppWrapper>
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
          <Route
            path="/dashboard/billing"
            render={props => (
              <Wrapper {...props}>
                <Billing {...props} />
              </Wrapper>
            )}
          />
        </Switch>
      </AppWrapper>
    );
  }
}

export default withRouter(App);

// styles
const AppWrapper = styled.div`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  background: ${props => props.theme.dark.bodyBackground};
  color: white;
`;
