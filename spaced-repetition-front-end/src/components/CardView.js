import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardView = ({ card }) => {
  console.log('card', card);
  return (
    <Card>
      <p>{card.title}</p>
      <p>{card.question}</p>
      <p>{card.answer}</p>
      <p>{card.language}</p>
      <button type="button">Edit</button>
    </Card>
  );
};

export default CardView;

// styles

const Card = styled.div`
  border: 1px solid black;
  width: 320px;
  margin: 2%;
  padding 2%;
`;

CardView.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
};
