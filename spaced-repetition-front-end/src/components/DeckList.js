import React, { Component } from 'react';
import Deck from './Deck';
import '../App.css';

class DeckList extends Component {
  render() {
    return (
      <div className="deck-list-container">
        {this.props.decks.map(deck => {
          return <Deck deck={deck}/>
        })}
      </div>
    );
  }
}

export default DeckList;
