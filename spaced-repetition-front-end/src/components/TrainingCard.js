import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled, { keyframes } from 'styled-components';
import Highlight from 'react-highlight.js';
import PropTypes from 'prop-types';
import { format } from 'path';

class TrainingCard extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
    showOptions: false, // show/hide menu for quitting session, editing card, etc
    showNext: false, // shows next/end training session buttons after missed it/got it is selected
    // each card's question and answer has text and possibly code snippets
    // would like to narrow this down to questionData and answerData objects
    // - avoiding prop issues atm
    showModal: false,
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

  showAnswer = () => {
    this.setState({ trained: true });
  }

  quitTrainingSession = () => {
    const { updateProgress } = this.props;
    this.setState({ redirect: true });
    updateProgress();
  }

  handleAnswer(difficulty) {
    // object to send to server: {difficulty: '', cardID: ''};
    const { formattedDeck, updateProgress } = this.props;
    const { currentCard } = this.state;
    const card = formattedDeck[currentCard];
    const progress = { cardID: card.id, deckID: card.deck_id, difficulty };

    this.setState({ showNext: true });
    updateProgress(progress);
  }

  leaveTraining = () => {
    const { history } = this.props;
    history.push('/dashboard/decks')
  }

  render() {
    const { formattedDeck, updateProgress } = this.props;

    const {
      trained, currentCard, showOptions, showNext, redirect,
    } = this.state;

    if (!formattedDeck[currentCard]) return <div />;
    const {
      qContentType, aContentType, qFilteredContent, aFilteredContent, title, language, id,
    } = formattedDeck[currentCard];
    if (redirect) return <Redirect to="/dashboard/decks" />;
    return (
      <MainCardContainer>
        <CardModal>
          <CardContainer>
            <Header>
              <CardTitle>{title}</CardTitle>
              <Cancel type="button" onClick={this.leaveTraining}>x</Cancel>
            </Header>

            <h3>Question</h3>
            {qFilteredContent.map((content, i) => {
              if (qContentType[i] === 'txt') {
                return <p key={`${i + qContentType[i]}`}>{content}</p>;
              }
              return (
                <Highlight key={`${i + qContentType[i]}`} language={language}>
                  {content}
                </Highlight>
              );
            })}
          </CardContainer>
          {trained && (
            <CardContainer>
              <AnimateOnReveal>
                <h3>Answer</h3>
                {aFilteredContent.map((content, i) => {
                  if (aContentType[i] === 'txt') {
                    return <p key={`${i + qContentType[i]}`}>{content}</p>;
                  }
                  return (
                    <Highlight key={`${i + qContentType[i]}`} language={language}>
                      {content}
                    </Highlight>
                  );
                })}
                <ButtonContainer>
                  <Missed type="button" onClick={() => this.handleAnswer(0)}>Missed It</Missed>
                  <CardButton type="button" onClick={() => this.handleAnswer(1)}>Got It</CardButton>
                  {(currentCard + 1) !== formattedDeck.length
                    ? (
                      <NextCardButton type="button" onClick={this.nextCard} showNext={showNext}>Next</NextCardButton>
                    )
                    : (
                      // Routing users back to decklist for now. Could add intermediary
                      // modal with further options (e.g. train again, deck list, dashboard, etc)
                      // showNext to string is recommended fix to console warning
                      <NextCardLink to="/dashboard/decks" shownext={showNext.toString()} onClick={() => updateProgress()}>End Session</NextCardLink>
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
            {currentCard + 1}
            /
            {formattedDeck.length}
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
            {/* <OptionItemLink to={`/dashboard/decks/${formattedDeck.id}/train/${id}/delete`}>
              Delete this card.
            </OptionItemLink> */}
          </OptionsMenu>
        </CardModal>
      </MainCardContainer>
    );
  }
}

export default withRouter(TrainingCard);

// styles

const CardContainer = styled.div`
  h3 {
    font-size: 22px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: lightgrey;
  }

  p{
    padding: 5px;
    font-size: 18px;
  }


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
  max-width: 600px;
  width: 100%;
  margin: 232px auto;
  padding: 2%;

  @media (max-width: 700px) {
    width: 90%; /* gives margin to left/right when screen gets smaller */
  }
`;


const Header = styled.h2`
  display: flex;
  width: 100%;
  min-height: 46px;
  /* align-self: flex-start; */
  justify-content: space-between;
  font-size: 20px;
  padding: 10px 0px 10px 0px;
`
const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;
  font-size: 20px;
  height: 26px;
  margin: 0px;
  padding: 0px;
  color: ${props => props.theme.dark.buttons.negative};

  /* width: 100px; */
`;

const CardTitle = styled.h2`
padding-bottom: 2%;
border-bottom: 1px solid white;
flex-grow: 1;
margin-right: 20px;
`;

const CardInteractionsAnswer = styled(CardContainer)`
  text-align: center;
`;

const ButtonContainer = styled(CardContainer)`
  display: flex;
  justify-content: space-between;
  width: 65%;
  margin: 0 auto;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardButton = styled.button`
  /* height: 35px;
  width: 125px; */

    ${props => props.theme.dark.buttons.base}
  &:hover {
        background: ${props => props.theme.dark.sidebar};
      }
`;

const Missed = styled(CardButton)`
   background: ${props => props.theme.dark.buttons.negative};
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

const ProgressText = styled.p`
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

const OptionItem = styled(ProgressText)`
  text-align: end;
  cursor: pointer;
        
  &:hover {
    color: turquoise;
  }
`;

const OptionItemLink = styled(Link)`
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
TrainingCard.defaultProps = {
  formattedDeck: [],
};

TrainingCard.propTypes = {
  formattedDeck: PropTypes.arrayOf(PropTypes.shape({
    qContentType: PropTypes.arrayOf(PropTypes.string),
    aContentType: PropTypes.arrayOf(PropTypes.string),
    qFilteredContent: PropTypes.arrayOf(PropTypes.string),
    aFilteredContent: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    language: PropTypes.string,
  })),
  updateProgress: PropTypes.func.isRequired,
};
