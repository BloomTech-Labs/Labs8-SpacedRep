import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';
import styled from 'styled-components';

const Container = styled.div`
  //
`;

const Deck = (props) => {
  const { deck } = props;
  return <Container className="deck-container">{deck.deckName}</Container>;
};

export default Deck;

// Wrapper.propTypes = {
//   deck: PropTypes.object.isRequired
// };
