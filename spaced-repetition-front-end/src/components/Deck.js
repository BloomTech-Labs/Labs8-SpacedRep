import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

// use to convert int date to actual date
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { deck } = this.props;
    return (
      <Container>
        <DeckHeader>
          <Title>{deck.name}</Title>

          <NumCards>{deck.cards.length}</NumCards>
        </DeckHeader>

        <DeckBody>
          {/* Routes user to deck training component which handles all
        of the training logic and flow. */}
          <TrainDeckLink to={`/dashboard/decks/${deck.id}/train`}>Train Deck</TrainDeckLink>
          <DueDate>
            {new Date(deck.dueDate * DAY_IN_MILLISECONDS).toLocaleDateString()}
          </DueDate>
        </DeckBody>
      </Container>
    );
  }
}

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
  justify-content: space-between;
`;

const TrainDeckLink = styled(Link)`
font-size: 16px;
`;

const DueDate = styled.div`
  color: lightgreen;
`;

Deck.propTypes = {
  deck: PropTypes.shape().isRequired,
};
