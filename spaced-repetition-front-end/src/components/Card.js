import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled, { keyframes } from 'styled-components';
import Highlight from 'react-highlight.js';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
    showOptions: false, // show/hide menu for quitting session, editing card, etc
    showNext: false, // shows next/end training session buttons after missed it/got it is selected
    // each card's question and answer has text and possibly code snippets
    // would like to narrow this down to questionData and answerData objects
    // - avoiding prop issues atm
    qFilteredContent: [],
    aFilteredContent: [],
    qContentType: [],
    aContentType: [],
  };

  showAnswer = () => {
    this.setState({ trained: true });
  }

  nextCard = () => {
    const { currentCard } = this.state;
    const { data } = this.props;
    this.setState({
      trained: false,
      currentCard: currentCard + 1,
      showOptions: false,
      showNext: false,
      // this may not be the best place to call handleSnippets
      // ran into problems with props - will fix
    }, () => this.handleSnippets(
      // do not destructure yet as it introduces a bug
      data.cards[this.state.currentCard].question,
      data.cards[this.state.currentCard].answer,
    ));
  }

  toggleOption = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }

  // determines if question and answer on each card has code snippet and abstracts it out
  // separation avoids console warning: <Highlight> can't nest inside <p>
  handleSnippets = (question, answer) => {
    const abstractSnippet = (type, data) => {
      let cache = [];
      const contentType = [];
      const trigger = '```';
      const content = data.split(trigger);

      const filteredContent = [];
      content.forEach((element) => {
        if (element !== '') filteredContent.push(element);
      });

      //   // if data starts with text
      if (data.substring(0, 3) !== trigger) {
        contentType.push('txt');
        cache.push('txt');
      }

      for (let i = 0; i < data.length; i += 1) {
        const substr = data.substring(i, i + 3);

        // if the current index + next 2 chars are ```, add to cache
        if (substr === trigger) {
          // if cache has matching ```, push code type and clear cache
          // end of code snippet
          if (cache.includes('code')) {
            contentType.push('code');
            cache = [];
          } else {
            // beginning of code snippet
            cache.push('code');
          }
          // if cache is empty, the next 3 chars aren't ```, and current char isn't ' ',
          // current content is txt
          if (cache.length === 0 && substr !== trigger && data[i] !== ' ') {
            cache.push('txt');
            contentType.push('txt');
          }
        }
      }
      return { filteredContent, contentType, type };
    };

    const questionData = abstractSnippet('question', question);
    const answerData = abstractSnippet('answer', answer);

    this.setState({
      qFilteredContent: questionData.filteredContent,
      aFilteredContent: answerData.filteredContent,
      qContentType: questionData.contentType,
      aContentType: answerData.contentType,
    });
  }

  showAnswer = () => {
    this.setState({ trained: true });
  }

  quitTrainingSession = () => {
    alert('quitting current training session!');
    // needs to send latest training data to algorithm/db
    // "Are you sure you want to quit this session?"
    // Route back to deck list
    this.setState({ redirect: true });
  }

  handleDeleteCard = () => {
    const { data, deleteCard } = this.props;
    const { currentCard } = this.state;
    const { id } = data.cards[currentCard];
    deleteCard(id, data.id);
  }

  handleAnswer(difficulty) {
    // object to send to server: {difficulty: '', cardID: ''};
    const { data, updateProgress } = this.props;
    const { currentCard } = this.state;
    const card = data.cards[currentCard];
    const progress = { cardID: card.id, deckID: card.deck_id, difficulty };

    this.setState({ showNext: true });
    updateProgress(progress);
  }

  render() {
    const { data, updateProgress } = this.props;
    const {
      trained, currentCard, showOptions, showNext, redirect, qContentType, aContentType,
      qFilteredContent, aFilteredContent,
    } = this.state;
    if (redirect) return <Redirect to="/dashboard/decks" />;
    return (
      data ? (
        <MainCardContainer>
          <CardModal>
            <CardContainer>
              <CardTitle>{data.cards[currentCard].title}</CardTitle>
              <h3>Question</h3>
              {qFilteredContent.map((content, i) => {
                if (qContentType[i] === 'txt') {
                  return <CardText key={`${i + qContentType[i]}`}>{content}</CardText>;
                }
                return (
                  <Highlight key={`${i + qContentType[i]}`} language={data.cards[currentCard].language}>
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
                      return <CardText key={`${i + qContentType[i]}`}>{content}</CardText>;
                    }
                    return (
                      <Highlight key={`${i + qContentType[i]}`} language={data.cards[currentCard].language}>
                        {content}
                      </Highlight>
                    );
                  })}
                  <ButtonContainer>
                    <CardButton type="button" onClick={() => this.handleAnswer(0)}>Missed It</CardButton>
                    <CardButton type="button" onClick={() => this.handleAnswer(1)}>Got It</CardButton>
                    {(currentCard + 1) !== data.cards.length
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
              <OptionItem
                onClick={this.handleDeleteCard}
              >
                Delete card.
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
  max-width: 600px;
  width: 100%;
  margin: 232px auto;
  padding: 2%;

  @media (max-width: 700px) {
    width: 90%; /* gives margin to left/right when screen gets smaller */
  }
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

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
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
  data: {
    cards: [],
  },
};

Card.propTypes = {
  data: PropTypes.shape(),
  updateProgress: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};
