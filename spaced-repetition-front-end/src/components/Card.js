import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
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

  endTrainingSession = () => {
    alert("Training session complete!");
  }

  render() {
    const { data } = this.props;
    const { trained, currentCard } = this.state;
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
                  <CardButton type="button" onClick={this.endTrainingSession}>End Training Session</CardButton>
                )
              }
            </CardInteractions>
          )}
          {!trained && (
            <CardInteractions>
              <CardButton type="button" onClick={this.showAnswer}>Show Answer</CardButton>
            </CardInteractions>
          )}
          <ProgressContainer>
            <ProgressText>
              Progress:
              {currentCard}
              /
              {data.cards.length}
            </ProgressText>
          </ProgressContainer>
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
const ProgressContainer = styled.div`
`;
const ProgressText = styled.p`
font-size: 12px;
`;
Card.defaultProps = {
  data: null,
};

Card.propTypes = {
  data: PropTypes.shape(),
};
