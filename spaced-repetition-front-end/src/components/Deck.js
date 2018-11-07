import React, { Component } from 'react';
import '../App.css';

class Deck extends Component {
  render() {
    console.log(this.props.deck.deckName);
    return (
      <div className="deck-container">
        {this.props.deck.deckName}
      </div>
    );
  }
}

export default Deck;
