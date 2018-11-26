import React from 'react';
import Card from './Card';

const TrainDeck = ({ deck }) => {
  return (
    <React.Fragment>
      <div> Training Time</div>
      <Card data={deck} />
    </React.Fragment>
  );
};

export default TrainDeck;
