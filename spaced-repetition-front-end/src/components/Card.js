import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
    showOptions: false, // show/hide menu for quitting session, editing card, etc
    showNext: false, // shows next/end training session buttons after missed it/got it is selected
  };

  showAnswer = () => {
    this.setState({ trained: true });
  }

  nextCard = () => {
    const { currentCard } = this.state;
    this.setState({
      trained: false,
      currentCard: currentCard + 1,
      showOptions: false,
      showNext: false,
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
    this.setState({ redirect: true });
  }

  handleMissed = () => {
    this.setState({ showNext: true });
    // send update to SRS algorithm
  };

  handleGot = () => {
    this.setState({ showNext: true });
    // send update to SRS algorithm
  };

  render() {
    const { data } = this.props;
    const {
      trained, currentCard, showOptions, showNext, redirect,
    } = this.state;
    if (redirect) return <Redirect to="/dashboard/decks" />;
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
              <AnimateOnReveal>
                <CardText>
                  Answer:
                  {' '}
                  {data.cards[currentCard].answer}
                </CardText>
                {/* Missed It and Got It buttons should connect to the SRS algorithm */}
                <CardButton type="button" onClick={this.handleMissed}>Missed It</CardButton>
                <CardButton type="button" onClick={this.handleGot}>Got It</CardButton>
                {(currentCard + 1) !== data.cards.length
                  ? (
                    <NextCardButton type="button" onClick={this.nextCard} showNext={showNext}>Next</NextCardButton>
                  )
                  : (
                    // Routing users back to deckl ist for now. Could add intermediary
                    // modal with further options (e.g. train again, deck list, dashboard, etc)
                    // showNext to string is recommended fix to console warning
                    <NextCardLink to="/dashboard/decks" shownext={showNext.toString()}>End Training Session</NextCardLink>
                  )
                }
              </AnimateOnReveal>
              <NextCardProgressText hidePrompt={showNext}>
                How did you do? Select to see the next card.
              </NextCardProgressText>
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

const NextCardButton = styled.button`
  display: ${props => (props.showNext ? 'inline-block' : 'none')};
`;

// because prop value is cast to a string, the condition will evaluate to true when value is false
const NextCardLink = styled(Link)` 
  display: ${props => (props.shownext === 'true' ? 'inline-block' : 'none')};
  font-size: 16px;
`;

const ProgressText = styled.p`
  font-size: 12px;
`;

const NextCardProgressText = styled(ProgressText)`
  visibility: ${props => (props.hidePrompt ? 'hidden' : 'visible')};
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

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }
`;

const AnimateOnReveal = styled.div`
  animation: ${FadeIn} 2s;
`;

Card.defaultProps = {
  data: null,
};

Card.propTypes = {
  data: PropTypes.shape(),
};
