import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

// "Deckname" should be replaced with the dynamic name of the deck.
// Not priority or urgent at this time.
const TrainDeck = ({ deck }) => (
  <TrainingContainer>
    <TrainingHeader>
      Training Deck:
      Deckname
    </TrainingHeader>
    <Card data={deck} />
  </TrainingContainer>
);

export default TrainDeck;

// styles
const TrainingContainer = styled.div`
`;

const TrainingHeader = styled.h2`
`;
TrainDeck.defaultProps = {
  deck: null,
};

TrainDeck.propTypes = {
  deck: PropTypes.shape(),
};
