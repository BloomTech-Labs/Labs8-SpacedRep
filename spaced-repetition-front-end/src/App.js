import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Auth from './auth/Auth';
import Callback from './auth/Callback';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import Wrapper from './components/Wrapper';
import Profile from './components/Profile';
import Billing from './components/Billing';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import TrainDeck from './components/TrainDeck';
import DeckView from './components/DeckView';
import DeleteCardModal from './components/DeleteCardModal';
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

const WAIT_INTERVAL = 5000;

// use to convert int date to actual date
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
// used if no dueDates are stored yet
const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      profile: null,
      cardsToUpdate: [],
      serverUpdateTimer: null,
      errorMessage: '', // better to add redux or pass the same error props everywhere?
    };
  }

  // Calls auth's getProfile and responds with the profile associated with the identity provider
  // used (e.g. The username/password profile response will be somewhat different than Google's)
  handleProfile = async () => {
    try {
      await auth.getProfile();
      const profile = auth.userProfile;
      const token = localStorage.getItem('id_token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/`, { id: auth.userProfile.sub }, { headers });
      profile.tier = response.data.tier;
      this.setState({ profile });
    } catch (error) {
      console.log('handleProfile failed: ', error);
    }
  }

  handleData = () => {
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${process.env.REACT_APP_URL}/api/decks/`, { headers })
      .then((response) => {
        console.log(response.data);
        // assign a dueDate to the deck based on its card with most recent dueDate
        const decks = response.data;
        decks.forEach((deck) => {
          let dueDate = 0;
          deck.cards.forEach((card) => {
            if (dueDate) {
              if (dueDate > card.dueDate) {
                dueDate = card.dueDate;
              }
            } else {
              dueDate = card.dueDate;
            }
          });

          deck.dueDate = dueDate || today;
        });

        this.setState({ decks });
      })
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
  }

  addCardToUpdate = (cardProgressObject = false) => {
    const { serverUpdateTimer, cardsToUpdate } = this.state;
    // cardProgressObject is {difficulty: '', cardID: '', deckID: ''}.
    // difficulty is an array index (0, 1, ..etc) which correlates to
    // difficultyToNextTestDate in algorithm.js

    clearTimeout(serverUpdateTimer);
    if (!cardProgressObject) {
      // instantly update the server with batch of cards waiting for timeout
      // this is used by End Session or Save-like functions in TrainDeck.js
      this.updateServer();
      return;
    }

    this.setState({
      cardsToUpdate: [cardProgressObject, ...cardsToUpdate],
      serverUpdateTimer: setTimeout(this.updateServer, WAIT_INTERVAL),
    });
  };

  updateServer = () => {
    // wait is done, send a POST to server to update card progress in case user does not save manually
    const { decks, cardsToUpdate } = this.state;
    const cards = cardsToUpdate;
    // if server is told to update via End Session/Save in TrainDeck, only update the server if there
    // are any cards in the queue
    if (cards.length < 1) return;

    if (cards.length > 0) {
      // update server
      const headers = { Authorization: `Bearer ${localStorage.getItem('id_token')}` };

      axios
        .post(`${process.env.REACT_APP_URL}/api/users/progress`, { cards }, { headers })
        .then((response) => {
          // this will return JSON with all of the progress data for this user
          // we can then use this to update the due dates of all the cards we just sent
          console.log(response);
          const newDates = response.data;

          cards.forEach((card) => {
            if (newDates[card.cardID]) {
              const newDueDate = newDates[card.cardID].dueDate;
              for (let i = 0; i < decks.length; i++) {
                if (decks[i].id == card.deckID) {
                  for (let j = 0; j < decks[i].cards.length; j++) {
                    if (decks[i].cards[j].id == card.cardID) {
                      decks[i].cards[j].dueDate = newDueDate;
                      // search through deck for most recent dueDate from all its cards
                      let dueDate = 0;
                      decks[i].cards.forEach((card) => {
                        if (dueDate) {
                          if (dueDate > card.dueDate.dueDate) {
                            dueDate = card.dueDate;
                          }
                        } else {
                          dueDate = card.dueDate;
                        }
                      });
                      decks[i].dueDate = dueDate || today;
                      break;
                    }
                  }
                }
              }
            } else {
              console.log('update failed');
            }
          });

          console.log(decks);
          this.setState({ decks });
        })
        .catch(error => this.setState({
          errorMessage: error,
        }));
    }

    // reset timer and updateQueue
    this.setState({ cardsToUpdate: [], serverUpdateTimer: null });
  };

  handleTrainDeck = (props) => {
    const { decks } = this.state;
    return decks.filter(deck => Number(deck.id) === Number(props.match.params.deckId));
  }

  handleUpdateTier = (tier) => {
    const { profile } = this.state;
    profile.tier = tier;
    this.setState({ profile });
  }

  handleCardDeletion = (cardId, deckId) => {
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };

    axios.delete(`${process.env.REACT_APP_URL}/api/cards/${cardId}`, { headers })
      .then(() => {
        const { decks } = this.state;
        // The db response is 1 for success, it does not return an updated array of decks.
        // updatedDecks returns a new array of decks with the recently deleted deck removed.
        const updatedDecks = decks.map((deck) => {
          if (Number(deck.id) === Number(deckId)) {
            deck.cards.map((card, i) => {
              if (Number(card.id) === Number(cardId)) {
                deck.cards.splice(i, 1);
              }
            });
          }
          return deck;
        });
        this.setState({
          decks: updatedDecks,
        });
      })
      .catch(err => console.log(new Error(err)));
  }

  importDeck = () => {
    console.log(this.props);
    console.log(this.props.match.params.id);
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
            <Route exact path="/dashboard" decks={decks} />
            <Route exact path="/dashboard/add-deck" render={props => <AddDeck />} />
            <Route exact path="/dashboard/profile" render={props => <Profile profile={profile} handleUpdateTier={this.handleUpdateTier} {...props} />} />
            <Route exact path="/dashboard/decks" render={props => <DeckList decks={decks} today={today} {...props} />} />
            <Route exact path="/dashboard/decks/:deckId" render={props => <DeckView decks={decks} today={today} {...props} />} />
            <Route exact path="/dashboard/cards" render={props => <CardList decks={decks} {...props} />} />
            <Route exact path="/dashboard/billing" render={props => <Billing profile={profile} {...props} />} />
            <Route
              exact
              path="/dashboard/decks/:deckId/train"
              render={(props) => {
                const deckToTrain = this.handleTrainDeck(props);
                return <TrainDeck deck={deckToTrain[0]} updateProgress={this.addCardToUpdate} {...props} />;
              }}
            />
            <Route
              exact
              path="/dashboard/decks/:deckId/train/:id/delete"
              render={props => <DeleteCardModal deleteCard={this.handleCardDeletion} {...props} />}
            />
            <Route path="/share/deck/:id">
              {this.importDeck()}
            </Route>
          </Wrapper>
        </Switch>
      </AppWrapper>
    );
  }
}

export default withRouter(App);

// styles
const AppWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: ${props => props.theme.dark.bodyBackground};
  color: white;
`;
