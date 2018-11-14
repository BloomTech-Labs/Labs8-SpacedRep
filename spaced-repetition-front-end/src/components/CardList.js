import React from 'react';
// import PropTypes from 'prop-types';
import Card from './Card';
import '../App.css';
import styled from 'styled-components';

const CardList = (props) => {
  const { cards } = props;
  return (
    <Container className="card-list-container">
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </Container>
  );
};

export default CardList;

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
