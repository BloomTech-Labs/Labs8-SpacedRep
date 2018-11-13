import React from 'react';
// import PropTypes from 'prop-types';
import Deck from './Deck';
import '../App.css';
import styled from 'styled-components';

const DeckList = (props) => {
  const { decks } = props;
  return (
    <Container>
      {decks.map(deck => (
        <Deck deck={deck} />
      ))}
    </Container>
  );
};

export default DeckList;

const Container = styled.div`
  width: 800px;
  height: 100%;
`;

// Wrapper.propTypes = {
//   decks: PropTypes.array.isRequired
// };
