import React from 'react';
// import PropTypes from 'prop-types';
import Deck from './Deck';
import '../App.css';

const DeckList = (props) => {
  console.log('props', props);
  const { decks } = props;
  return (
    <div className="deck-list-container">
      {decks.map(deck => (
        <Deck key={deck.deckName} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;

// Wrapper.propTypes = {
//   decks: PropTypes.array.isRequired
// };
