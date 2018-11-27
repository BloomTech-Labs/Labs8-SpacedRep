import React from 'react';
import styled from 'styled-components';

// cards need title, question, answer, deckId, language
// for deckId, will have to post the deck first, then use the response
// to set the deckId of each card before entering into the db

class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      public: false,
      tags: '',
      cards: [],
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
    // post request to cards with deckCards
    this.setState({
      name: '',
      public: '',
      tags: '',
      cards: [],
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
          <input type="checkbox" name="public" onChange={this.handleChange} required />
          <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default AddDeck;
