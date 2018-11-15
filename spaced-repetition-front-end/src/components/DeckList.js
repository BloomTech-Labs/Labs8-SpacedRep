import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Deck from './Deck';
import '../App.css';

const DeckList = props => {
  const { decks } = props;
  return (
    <Container>
      {decks.map((deck, i) => (
        <Deck key={i} deck={deck} />
      ))}
    </Container>
  );
};

export default DeckList;

const Container = styled.div`
  width: 800px;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Wrapper.propTypes = {
//   decks: PropTypes.array.isRequired
// };
