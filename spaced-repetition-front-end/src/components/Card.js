import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
    showOptions: false, // show/hide menu for quitting session, editing card, etc
  };

  showAnswer = () => {
    this.setState({ trained: true });
  }

  nextCard = () => {
    const { currentCard } = this.state;
    this.setState({
      currentCard: currentCard + 1,
      trained: false,
    });
  }

  toggleOption = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }

  quitTrainingSession = () => {
    alert('quitting current training session!');
    // needs to send latest training data to algorithm/db
    // "Are you sure you want to quit this session?"
    // Route back to deck list
  }

  render() {
    const { data } = this.props;
    const { trained, currentCard, showOptions } = this.state;
    return (
      data ? (
        <CardContainer>
          <CardData>
            <CardTitle>{data.cards[currentCard].title}</CardTitle>
            <CardText>
              Question:
              {' '}
              {data.cards[currentCard].question}
            </CardText>
          </CardData>
          {trained && (
            <CardInteractions>
              <CardText>
                Answer:
                {' '}
                {data.cards[currentCard].answer}
              </CardText>
              {/* Missed It and Got It buttons should connect to the SRS algorithm */}
              <CardButton type="button">Missed It</CardButton>
              <CardButton type="button">Got It</CardButton>
              {(currentCard + 1) !== data.cards.length
                ? (
                  <CardButton type="button" onClick={this.nextCard}>Next</CardButton>
                )
                : (
                  // Routing users back to deckl ist for now. Could add intermediary
                  // modal with further options (e.g. train again, deck list, dashboard, etc)
                  <CardLink to="/dashboard/decks">End Training Session</CardLink>
                )
              }
            </CardInteractions>
          )}
          {!trained && (
            <CardInteractions>
              <CardButton type="button" onClick={this.showAnswer}>Show Answer</CardButton>
            </CardInteractions>
          )}
          <ProgressText>
            Progress:
            {currentCard}
            /
            {data.cards.length}
          </ProgressText>
          {/* Toggles more options for UX: edit card, quit current training, etc */}
          {/* Could be modal? */}
          <OptionsButton type="button" onClick={this.toggleOption}>...</OptionsButton>
          <OptionsMenu status={showOptions}>
            <OptionItem
              onClick={this.quitTrainingSession}
            >
              Quit current training session.
            </OptionItem>
          </OptionsMenu>
        </CardContainer>
      ) : null
    );
  }
}

export default Card;

// styles
const CardContainer = styled.div`
`;

const CardData = styled.div`
`;

const CardTitle = styled.h2`
`;

const CardText = styled.p`
`;

const CardInteractions = styled.div`
`;

const CardButton = styled.button`
`;

const CardLink = styled(Link)`
  font-size: 16px;
`;

const ProgressText = styled.p`
  font-size: 12px;
`;

const OptionsButton = styled.div`
  cursor: pointer;

  &:hover {
    color: turquoise;
  }
`;

const OptionsMenu = styled.div`
  display: ${props => (props.status ? 'block' : 'none')};
`;

const OptionItem = styled.p`
  cursor: pointer;

  &:hover {
    color: turquoise;
  }
`;

Card.defaultProps = {
  data: null,
};

Card.propTypes = {
  data: PropTypes.shape(),
};
