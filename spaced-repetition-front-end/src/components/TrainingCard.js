import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled, { keyframes, css } from 'styled-components';
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
    answerSelected: false,
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
          <FrontSide trained={trained}>
            <TopCard>
              <CancelContainer>
                <Cancel type="button" onClick={this.leaveTraining}>x</Cancel>
              </CancelContainer>

              <CardTitle>{title}</CardTitle>

              <h3>Question</h3>
              {qFilteredContent.map((content, i) => {
                if (qContentType[i] === 'txt') {
                  return <CardQuestion key={`${i + qContentType[i]}`}>{content}</CardQuestion>;
                }
                return (
                  <Highlight key={`${i + qContentType[i]}`} language={language}>
                    {content}
                  </Highlight>
                );
              })}


            </TopCard>

            <BottomCard >
              {!trained ?
                <CardInteractionsAnswer>
                  <CardButton type="button" onClick={this.showAnswer}>Show Answer</CardButton>
                </CardInteractionsAnswer>
                :
                <NextCardProgressText hidePrompt={showNext}>
                  How did you do? Select to see the next card.
              </NextCardProgressText>
              }

              <ProgressText>
                {`${currentCard + 1} of ${formattedDeck.length} cards completed`}
              </ProgressText>

            </BottomCard>

          </FrontSide>

          <BackSide trained={trained}>
            <TopCard>
              <CancelContainer>
                <Cancel type="button" onClick={this.leaveTraining}>x</Cancel>
              </CancelContainer>

              <CardTitle>{title}</CardTitle>

              <h3>Question</h3>
              {qFilteredContent.map((content, i) => {
                if (qContentType[i] === 'txt') {
                  return <CardQuestion key={`${i + qContentType[i]}`}>{content}</CardQuestion>;
                }
                return (
                  <Highlight key={`${i + qContentType[i]}`} language={language}>
                    {content}
                  </Highlight>
                );
              })}

              <h3>Answer</h3>
              {aFilteredContent.map((content, i) => {
                if (aContentType[i] === 'txt') {
                  return <CardAnswer key={`${i + qContentType[i]}`}>{content}</CardAnswer>;
                }
                return (
                  <Highlight key={`${i + qContentType[i]}`} language={language}>
                    {content}
                  </Highlight>
                );
              })}
            </TopCard>

            <BottomCard>
              <ButtonContainer>
                {!showNext && <Missed type="button" onClick={() => this.handleAnswer(0)}>Missed It</Missed>}
                {!showNext && <CardButton type="button" onClick={() => this.handleAnswer(1)}>Got It</CardButton>}

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
              <ProgressText>
                {`${currentCard + 1} of ${formattedDeck.length} cards completed`}
              </ProgressText>
            </BottomCard>
          </BackSide>

          {/* {trained && (
            <BackSide>
              <CancelContainer>
                <Cancel type="button" onClick={this.leaveTraining}>x</Cancel>
              </CancelContainer>

              <CardTitle>{title}</CardTitle>

              <h3>Question</h3>
              {qFilteredContent.map((content, i) => {
                if (qContentType[i] === 'txt') {
                  return <CardQuestion key={`${i + qContentType[i]}`}>{content}</CardQuestion>;
                }
                return (
                  <Highlight key={`${i + qContentType[i]}`} language={language}>
                    {content}
                  </Highlight>
                );
              })}
              <AnimateOnReveal>
                <TopCard>
                  <h3>Answer</h3>
                  {aFilteredContent.map((content, i) => {
                    if (aContentType[i] === 'txt') {
                      return <CardAnswer key={`${i + qContentType[i]}`}>{content}</CardAnswer>;
                    }
                    return (
                      <Highlight key={`${i + qContentType[i]}`} language={language}>
                        {content}
                      </Highlight>
                    );
                  })}
                </TopCard>
                <BottomCard>
                  <ButtonContainer>
                    {!showNext && <Missed type="button" onClick={() => this.handleAnswer(0)}>Missed It</Missed>}
                    {!showNext && <CardButton type="button" onClick={() => this.handleAnswer(1)}>Got It</CardButton>}

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
                </BottomCard>
              </AnimateOnReveal>

            </BackSide>
          )}

          <BottomCard>
            {!trained ?
              <CardInteractionsAnswer>
                <CardButton type="button" onClick={this.showAnswer}>Show Answer</CardButton>
              </CardInteractionsAnswer>
              :
              <NextCardProgressText hidePrompt={showNext}>
                How did you do? Select to see the next card.
              </NextCardProgressText>
            }

            <ProgressText>
              {`${currentCard + 1} of ${formattedDeck.length} cards completed`}
            </ProgressText>
          </BottomCard> */}

        </CardModal>
      </MainCardContainer >
    );
  }
}

export default withRouter(TrainingCard);

// styles
const FrontSide = styled.div`
  width: 100%;
  position: absolute;
  background: ${props => props.theme.dark.bodyBackground};
  transition: all 0.8s ease;
  backface-visibility: hidden;

  ${props => props.trained && css`
    /* background: ${styleProps => styleProps.theme.dark.bodyBackground}; */
    transform: rotateY(180deg);
  `}
  border-radius: 10px;

`

const BackSide = styled(FrontSide)`
  visibility: hidden;
  z-index: 10;
  background: ${props => props.theme.dark.bodyBackground};
  transform: rotateY(-180deg);

  ${props => props.trained && css`
    visibility: visible;
    transform: rotateY(0);
  `}
`

const TopCard = styled.div`
  padding: 0% 3%;
  /* background: ${props => props.theme.dark.bodyBackground}; */
  /* border: 1px solid blue; */

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const BottomCard = styled.div`
  /* background: ${props => props.theme.dark.main}; */
  padding: 15px;
`
// covers and darkens viewport except for modal
const CardContainer = styled.div`
  h3 {
    font-size: 17px;
    padding-top: 12px;
    padding-bottom: 8px;
    color: lightgrey;
  }
`;

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
  perspective: 150rem;
  max-width: 650px;
  width: 100%;
  margin: 232px auto;
  /* padding: 1% 2% 0% 2%; */

  @media (max-width: 700px) {
    width: 90%; /* gives margin to left/right when screen gets smaller */
  }
`;

const CardQuestion = styled.p`
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
`

const CardAnswer = styled(CardQuestion)`
  font-weight:normal;
`

const CancelContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0px;
  margin: 0px;
`
const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;
  font-size: 24px;
  height: 26px;
  margin: 0px;
  padding: 0px;
  color: ${props => props.theme.dark.buttons.negative};

  /* width: 100px; */
`;


const CardTitle = styled.h2`
  display: flex;
  width: 100%;
  /* min-height: 46px; */
  /* align-self: flex-start; */
  justify-content: flex-start;
  font-size: 20px;
  padding-bottom: 10px;
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
  /* padding: 20px 10px; */
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardButton = styled.button`
  /* height: 35px;
  width: 125px; */

  ${props => props.theme.dark.buttons.base}
`;

const Missed = styled(CardButton)`
   background: ${props => props.theme.dark.buttons.negative};
`;

const NextCardButton = styled(CardButton)`
  margin: 0px 10px 0px 10px;
  width: 100%;
  display: ${props => (props.showNext ? 'inline-block' : 'none')};
`;

// because prop value is cast to a string, the condition will evaluate to true when value is false
const NextCardLink = styled(Link)` 
  display: ${props => (props.shownext === 'true' ? 'flex' : 'none')};
  justify-content: center;

  ${props => props.theme.dark.buttons.base}
  margin: 10px;
  width: 100%;
  padding: 15px 10px 15px 10px;
  &:hover {
        background: ${props => props.theme.dark.sidebar};
        text-decoration: none;
    }
`;

const ProgressText = styled.p`
  text-align: center;
  font-size: 14px;
  padding: 10px;
  color: lightgrey;
`;

const NextCardProgressText = styled(ProgressText)`
  visibility: ${props => (props.hidePrompt ? 'hidden' : 'visible')};
  color: lightgrey;
  font-size: 14px;
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


const CardDetails = styled.div`

`


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
