import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Deck from './Deck';
import '../App.css';

const DeckList = ({ decks }) => (
  <Container>
    {decks.map(deck => (
      <Deck key={deck.name} deck={deck} />
    ))}
  </Container>
);

export default DeckList;

DeckList.propTypes = {
  decks: PropTypes.instanceOf(Array).isRequired,
};

// styles
const Container = styled.div`
  width: 800px;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
