import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';
import { withRouter } from 'react-router-dom'
import Card from './Card';

class TrainDeck extends React.Component {
  state = {
    trained: false,
    currentCard: 0, // deck training begins with the first card in the array
    showOptions: false, // show/hide menu for quitting session, editing card, etc
    showNext: false, // shows next/end training session buttons after missed it/got it is selected
    // each card's question and answer has text and possibly code snippets
    // would like to narrow this down to questionData and answerData objects
    // - avoiding prop issues atm

    formattedDeck: [],
  };

  componentDidMount() {
    if (!this.props.deck) {
      //redirect if props did not load (happens on refresh at trainDeck page)
      this.props.history.push('/dashboard/decks')
      return
    }

    //check all cards to train for code snippets and format them for the Card child component
    const { cards } = this.props.deck;

    const formattedDeck = []

    cards.forEach(card => {
      const formattedCard = this.handleCardSnippets(card);
      formattedDeck.push(formattedCard)
    })

    this.setState({ formattedDeck })
  }

  handleCardSnippets = (card) => {
    const { question, answer } = card
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

    //assign formatted data to card for passing as prop
    card.qFilteredContent = questionData.filteredContent
    card.aFilteredContent = answerData.filteredContent
    card.qContentType = questionData.contentType
    card.aContentType = answerData.contentType

    return card
  }

  render() {
    const { deck, updateProgress } = this.props;
    const { formattedDeck } = this.state;
    return (
      <TrainingContainer>
        <TrainingHeader>
          Currently training:
                      {' '}
          {deck ? deck.name : 'Loading...'}
        </TrainingHeader>
        {/* <Card data={deck} updateProgress={updateProgress} /> */}
        <Card formattedDeck={formattedDeck} updateProgress={updateProgress} />
      </TrainingContainer>
    )
  }
}

export default withRouter(TrainDeck);

// styles
const TrainingContainer = styled.div`
`;

const TrainingHeader = styled.h2`
`;
TrainDeck.defaultProps = {
  deck: null,
};

TrainDeck.propTypes = {
  deck: PropTypes.shape(),
  updateProgress: PropTypes.func.isRequired,
};
