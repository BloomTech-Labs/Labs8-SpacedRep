import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

// use to convert int date to actual date
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTrain = () => {
    const { history, deck } = this.props;
    history.push(`/dashboard/decks/${deck.id}/train`)
  }

  render() {
    const { deck } = this.props;
    return (
      <Container>
        <DeckHeader>
          <Title>{deck.name}</Title>

          <NumCards> {deck.cards.length === 1 ? `${deck.cards.length} card` : `${deck.cards.length} cards`} </NumCards>
        </DeckHeader>

        <DeckBody>
          {/* Routes user to deck training component which handles all
        of the training logic and flow. */}
          <TrainDeck onClick={this.handleTrain}>Train Deck</TrainDeck>

          <DueDateContainer>
            <DueDate>
              {new Date(deck.dueDate * DAY_IN_MILLISECONDS).toLocaleDateString()}
            </DueDate>
            <DateCaption>
              next training
            </DateCaption>
          </DueDateContainer>

        </DeckBody>
      </Container>
    );
  }
}

export default withRouter(Deck);

// styles
const Container = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
  padding: 20px;
  margin: 5px;
  width: 40%;
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px;
`;

const DeckHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
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
  align-items: center;
  padding-top: 20px;
`;

const TrainDeck = styled.button`
  font-size: 16px;
`;

const DueDateContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: flex-end;
  /* width: 100%; */
`

const DueDate = styled.div`
  color: lightgreen;
`;

const DateCaption = styled.div`
  color: lightgrey;
`

Deck.propTypes = {
  deck: PropTypes.shape().isRequired,
};
