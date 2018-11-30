import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardView = ({ card, deckName }) => {
  console.log('card', card);
  return (
    <Card>
      <p>{card.title}</p>
      <p>{card.question}</p>
      <p>{card.answer}</p>
      <p>{card.language}</p>
      <CardInteractions>
        <p>{`From deck: ${deckName}`}</p>
        <button type="button">Edit</button>
      </CardInteractions>
    </Card>
  );
};

export default CardView;

// styles

const Card = styled.div`
  border: 1px solid black;
  width: 315px;
  margin: 2%;
  padding 2%;
`;

const CardInteractions = styled.div`
  display: flex;
  justify-content: space-between;
`;

CardView.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
};
