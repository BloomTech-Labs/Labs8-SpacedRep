import React from 'react';
import PropTypes from 'prop-types';
import CardView from './CardView';

const CardList = ({ decks }) => {
  let cards = [];
  decks.map((deck) => {
    cards = cards.concat(deck.cards);
  });

  return (
    <div>
      {cards.map(card => <p>card.title</p>)}
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  decks: PropTypes.instanceOf(Array).isRequired,
};
