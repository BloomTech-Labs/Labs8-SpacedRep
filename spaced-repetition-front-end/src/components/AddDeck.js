import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import CardInputs from './CardInputs';

// Need to make sure all card inputs are completed before submitting
// iterate through all the properties exist on each object
// check to make sure value.length of each is greater than 0

class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      public: false,
      tags: '',
      cards: [{ language: 'Plain Text' }],
    };
  }

  handleChange = (e) => {
    const { target } = e;
    let val;
    if (target.type === 'checkbox') {
      val = target.checked;
    } else {
      e.preventDefault();
      val = target.value;
    }
    const { name } = target;
    this.setState({
      [name]: val,
    });
  }

  handleCardChange = (i, name, val) => {
    const { state } = this;
    const cards = [...state.cards];
    cards[i][name] = val;
    this.setState({
      cards,
    }, () => console.log(state));
  }

  addDeck = (e) => {
    e.preventDefault();
    const deck = this.state;
    const newDeck = {
      name: deck.name,
      public: deck.public,
      tags: deck.tags,
    };
    const deckCards = [...deck.cards];
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/decks/`, newDeck, { headers })
      .then((response) => {
        deckCards.forEach((x) => {
          x.deck_id = response.data;
        });
        console.log(deckCards);
        axios.post(`${process.env.REACT_APP_URL}/api/cards/batch`, deckCards, { headers })
          .then((innerResponse) => {
            console.log(innerResponse);
          })
          .catch(err => console.log(err.message));
        window.location.reload();
        this.props.history.push('/dashboard/decks');
      })
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
    // post request to cards with deckCards
    this.setState({
      name: '',
      public: '',
      tags: '',
      cards: [{ language: 'Plain Text' }],
    });
  }

  newCard = () => {
    this.setState((state) => ({ cards: [...state.cards, { language: 'Plain Text' }] }));
  }

  render() {
    const { state } = this;
    return (
      <DeckContainer>
        <h2>Create New Deck:</h2>
        <DeckForm onSubmit={this.addDeck}>
          <DeckInfo>
            <input type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
            <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
            <p style={{ color: 'black' }}>Public?</p>
            <Checkbox type="checkbox" name="public" onChange={this.handleChange} />
            <button type="submit">Save</button>
          </DeckInfo>
        </DeckForm>
        {state.cards.map((x, i) => <CardInputs i={i} key={i} handleCardChange={this.handleCardChange} />)}
        <button type="button" onClick={this.newCard}>Add Card</button>
      </DeckContainer>
    );
  }
}

export default withRouter(AddDeck);

const DeckContainer = styled.div`
  width: 100%;
`;

const DeckForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  align-items: baseline;
  justify-content: space-between;
  box-shadow: none;
`;

const DeckInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  align-items: baseline;
  justify-content: space-between;
  box-shadow: none;

  input[type="text"] {
    flex-grow: 1;
  }

  button {
    flex-grow: 0.5;
  }

  * {
    margin-left: 5px; 
  }

  input:first-child {
    margin-left: 0;
  }
`;

const Checkbox = styled.input`
  align-self: center;
`;
