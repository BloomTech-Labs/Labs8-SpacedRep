import React, { Component } from 'react';
import '../App.css';

class Deck extends Component {
  render() {
    return (
      <div className="deck-container">
        {this.props.deck.deckName}
      </div>
    );
  }
}

export default Deck;
