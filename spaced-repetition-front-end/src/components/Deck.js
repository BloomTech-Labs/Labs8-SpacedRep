import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import '../App.css';

const Deck = (props) => {
  const { deck } = props;
  return (
    <Container className="deck-container">
      <DeckHeader>
        <Title>{deck.name}</Title>

        <NumCards> 42 </NumCards>
      </DeckHeader>

      <DeckBody>
        <DueDate> 11/19/2018 </DueDate>
      </DeckBody>
    </Container>
  );
};

export default Deck;

// styles
const Container = styled.div`
  padding: 20px;
  margin: 5px;
  width: 50%;
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px;
`;

const DeckHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
`;

const NumCards = styled.div`
  color: lightgrey;
`;

const DeckBody = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DueDate = styled.div`
  color: lightgreen;
`;

// Wrapper.propTypes = {
//   deck: PropTypes.object.isRequired
// };
