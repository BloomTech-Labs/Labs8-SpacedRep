import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardView from './CardView';

const CardList = ({ decks }) => {
  let cards = [];
  decks.map((deck) => {
    cards = cards.concat(deck.cards);
  });

  return (
    <CardContainer>
      {cards.map(card => <CardView key={card.id} card={card} />)}
    </CardContainer>
  );
};

export default CardList;

// styled

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

CardList.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
