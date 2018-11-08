import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

const Deck = (props) => {
  const { deck } = props;
  return <div className="deck-container">{deck.deckName}</div>;
};

export default Deck;

// Wrapper.propTypes = {
//   deck: PropTypes.object.isRequired
// };
