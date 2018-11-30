import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardView from './CardView';
import CardListTools from './CardListTools';

const CardList = ({ decks }) => {
  return (
    <CardContainer>
      <CardListTools />
      {decks.map((deck) => {
        return deck.cards.map(card => <CardView key={card.id} card={card} deckName={deck.name} />);
      })}
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
