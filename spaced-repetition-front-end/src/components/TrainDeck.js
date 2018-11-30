import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const TrainDeck = ({ deck, updateProgress, deleteCard }) => (
  <TrainingContainer>
    <TrainingHeader>
      Currently training:
      {' '}
      {deck ? deck.name : 'Loading...'}
    </TrainingHeader>
    <Card data={deck} updateProgress={updateProgress} deleteCard={deleteCard} />
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
  updateProgress: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};
