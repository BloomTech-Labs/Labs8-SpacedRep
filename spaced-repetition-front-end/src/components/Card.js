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
        <MainCardContainer>
          <CardModal>
            <CardContainer>
              <CardTitle>{data.cards[currentCard].title}</CardTitle>
              <CardText>
                Question:
                {' '}
                {data.cards[currentCard].question}
              </CardText>
            </CardContainer>
            {trained && (
              <CardContainer>
                <AnimateOnReveal>
                  <CardText>
                    Answer:
                    {' '}
                    {data.cards[currentCard].answer}
                  </CardText>
                  {/* Missed It and Got It buttons should connect to the SRS algorithm */}
                  <ButtonContainer>
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
                        <NextCardLink to="/dashboard/decks" shownext={showNext.toString()}>End Session</NextCardLink>
                      )
                    }
                  </ButtonContainer>
                </AnimateOnReveal>
                <NextCardProgressText hidePrompt={showNext}>
                  How did you do? Select to see the next card.
                </NextCardProgressText>
              </CardContainer>
            )}
            {!trained && (
              <CardInteractionsAnswer>
                <CardButton type="button" onClick={this.showAnswer}>Show Answer</CardButton>
              </CardInteractionsAnswer>
            )}
            <ProgressText>
              Progress:
              {currentCard}
              /
              {data.cards.length}
            </ProgressText>
            {/* Toggles more options for UX: edit card, quit current training, etc */}
            {/* Could be modal? */}
            <OptionsButton type="button" title="Options" onClick={this.toggleOption}>...</OptionsButton>
            <OptionsMenu status={showOptions}>
              <OptionItem
                onClick={this.quitTrainingSession}
              >
                Quit current training session.
              </OptionItem>
            </OptionsMenu>
          </CardModal>
        </MainCardContainer>
      ) : null
    );
  }
}

export default Card;

// styles

const CardContainer = styled.div`
`;

// covers and darkens viewport except for modal
const MainCardContainer = styled(CardContainer)`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const CardModal = styled.div`
  background-color: #43525c;
  width: 600px;
  margin: 232px auto;
  padding: 2%;
`;


const CardTitle = styled.h2`
padding-bottom: 2%;
border-bottom: 1px solid white;
`;

const CardText = styled.p`
`;

const CardInteractionsAnswer = styled(CardContainer)`
  text-align: center;
`;

const ButtonContainer = styled(CardContainer)`
  display: flex;
  justify-content: space-between;
  width: 65%;
  margin: 0 auto;
`;

const CardButton = styled.button`
  height: 35px;
  width: 125px;
`;

const NextCardButton = styled(CardButton)`
  display: ${props => (props.showNext ? 'inline-block' : 'none')};
`;

// because prop value is cast to a string, the condition will evaluate to true when value is false
const NextCardLink = styled(Link)` 
  display: ${props => (props.shownext === 'true' ? 'flex' : 'none')};
  height: 35px;
  width: 125px;
  font-size: 15px;
  border-radius: 3px;
  margin-top: 5px;
  color: white;
  background: lightseagreen;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* this needs to be on everything! */

    &:hover {
      text-decoration: none;
    }
`;

const ProgressText = styled(CardText)`
  text-align: center;
  font-size: 12px;
`;

const NextCardProgressText = styled(ProgressText)`
  visibility: ${props => (props.hidePrompt ? 'hidden' : 'visible')};
  font-size: 12px;
`;

const OptionsButton = styled(CardContainer)`
  text-align: end;
  cursor: pointer;
          
  &:hover {
    color: turquoise;
  }
`;

const OptionsMenu = styled(CardContainer)`
  display: ${props => (props.status ? 'block' : 'none')};
  margin-top: 2%;
  border-top: 1px solid white;
`;

const OptionItem = styled(CardText)`
  text-align: end;
  cursor: pointer;
        
  &:hover {
    color: turquoise;
  }
`;

// animation styling
const FadeIn = keyframes`
  0% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }
`;

const AnimateOnReveal = styled(CardContainer)`
  animation: ${FadeIn} 2s;
`;

// prop checking
Card.defaultProps = {
  data: null,
};

Card.propTypes = {
  data: PropTypes.shape(),
};
