import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CardInputs from './CardInputs';

// cards need title, question, answer, deckId, language
// for deckId, will have to post the deck first, then use the response
// to set the deckId of each card before entering into the db

// onSave of card, it concats the card to the cards array

// need to auto set the deck_id of each card to the
// response from creating the deck, then send the arr
// need to limit it so users can only hit save on a card once,
// otherwise they're able to repeatedly duplicate the card on save

class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      public: false,
      tags: '',
      cards: [],
      tempArr: [],
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
    }, () => console.log(this.state));
  }

  onCardSave = (newCard) => {
    this.setState((state) => {
      return { cards: [...state.cards, newCard] };
    });
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
    // post request to decks with newDeck
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/decks/`, newDeck, { headers })
      .then(response => (
        console.log(response)
      ))
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
      cards: [],
    });
  }

  newCard = () => {
    this.setState((state) => {
      return { tempArr: [...state.tempArr, 'another one'] };
    });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h2>Create New Deck:</h2>
        <form onSubmit={this.addDeck}>
          <input type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
          <p style={{ color: 'black' }}>Public?</p>
          <input type="checkbox" name="public" onChange={this.handleChange} />
          <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
          <button type="button" onClick={this.newCard}>Add Card</button>
          <button type="submit">Save</button>
        </form>
        {state.tempArr.map((x, i) => {
          return <CardInputs i={i} onCardSave={this.onCardSave} />;
        })}
      </div>
    );
  }
}

export default AddDeck;
