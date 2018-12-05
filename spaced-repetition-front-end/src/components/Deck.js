import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import EditDeck from './EditDeck';
import '../App.css';

const shareIcon = require('../images/shareColorized.svg');

// use to convert int date to actual date
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  handleDeleteDeck = (deckId) => {
    const { history } = this.props;
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.delete(`${process.env.REACT_APP_URL}/api/decks/${deckId}`, { headers })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
    history.push('/dashboard/decks');
  }

  handleEditDeck = () => {
    this.setState({ isEditing: true });
  }

  toggleEditModeToFalse = () => {
    this.setState({ isEditing: false });
  }

  handleTrain = (e) => {
    e.stopPropagation();
    const { history, deck } = this.props;
    history.push(`/dashboard/decks/${deck.id}/train`);
  }

  handleDeckClick = () => {
    const { history, deck, disableView } = this.props;
    if (disableView) return;
    history.push(`/dashboard/decks/${deck.id}`);
  }

  viewTags = (tagString) => {
    if (!tagString) return;
    const tags = tagString.split(',');

    // no clue why this is an eslint error, if you add a return then eslint removes it.
    // this error only shows because of the !tagString check above ^ which
    // prevents an error on window redirects sometimes
    return (
      tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)
    );
  }

  handleShare = (e) => {
    const { deck } = this.props;
    e.stopPropagation();
    // copy to clipboard not working
    // if (document.queryCommandSupported('copy')) {
    //   console.log(document.execCommand('copy'));
    //   e.target.focus();
    // }
    const endOfUrl = process.env.REACT_APP_REDIRECT.lastIndexOf('/')
    alert(`Shareable link: ${process.env.REACT_APP_REDIRECT.substr(0, endOfUrl)}/share/deck/${deck.id}`); //FIX
  }

  render() {
    const { deck, today, disableTraining } = this.props;

    const { isEditing } = this.state;

    return (
      !isEditing ?
        <Container onClick={this.handleDeckClick}>
          <DeckHeader>
            <Title>{deck.name}</Title>

            <NumCards>

              {deck.cards.length === 1 ? `${deck.cards.length} card` : `${deck.cards.length} cards`}

            </NumCards>
          </DeckHeader>

          <DeckBody>
            <ShareContainer>
              <Share onClick={this.handleShare} src={shareIcon} alt="Share" />
            </ShareContainer>
            <TagsContainer>
              <TagCaption> Tags: </TagCaption>
              {this.viewTags(deck.tags)}
            </TagsContainer>
            {!disableTraining && (
              <TrainingContainer>
                {/* Routes user to deck training component which handles all
        of the training logic and flow. */}
                <TrainDeck onClick={this.handleTrain}>Train Deck</TrainDeck>
                <TrainDeck onClick={() => this.handleDeleteDeck(deck.id)}>Delete</TrainDeck>
                <TrainDeck onClick={() => this.handleEditDeck(deck.id)}>Edit</TrainDeck>
                <DueDateContainer>
                  <DueDate today={today} dueDate={deck.dueDate}>
                    {new Date(deck.dueDate * DAY_IN_MILLISECONDS).toLocaleDateString()}
                  </DueDate>
                  <DateCaption>
                    next training
                </DateCaption>
                </DueDateContainer>

              </TrainingContainer>
            )}
          </DeckBody>
          <ClipboardInput value={`${process.env.REACT_APP_URL}/share/deck/${deck.id}`} ref={ClipboardInput => this.clipboardRef = ClipboardInput} />
        </Container>
        :
        <EditDeck deck={deck} toggleEditModeToFalse={this.toggleEditModeToFalse} />

    );
  }
}

export default withRouter(Deck);

// styles
const Container = styled.div`
  padding: 20px;
  margin: 5px;
  width: 50%;
  border: 1px solid ${props => props.theme.dark.main};
  background: ${props => props.theme.dark.cardBackground};
  display:flex;
  flex-direction: column;
  /* height:100%; */
  /*changes from development below */
  /* padding: 15px 20px 15px 20px;
  margin: 10px;
  width: 40%;
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px; */
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
  display:flex;
  flex-direction: column;
  padding-top: 10px;
  width: 100%;
`;

const ShareContainer = styled.div`
  width: 100%;
  display:flex;
  justify-content: flex-end;
`;

const Share = styled.img`
  color: lightgrey;
  height: 35px;
  width: 35px;
  margin: 1px;
  &:hover {
    cursor: pointer;
  }
`;

const TagsContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
`;

const Tag = styled.div`
  padding: 6px;
  margin-right: 5px;
  background: ${props => props.theme.dark.sidebar};
  border-radius: 2px 10px 10px;
`;

const TagCaption = styled.div`
  padding: 10px;
  color: lightgrey;
`;

const TrainingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  width:100%;
`;

const TrainDeck = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  font-size: 16px;
`;

const DueDateContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: flex-end;
  /* width: 100%; */
`;

const DueDate = styled.div`
  color: lightgreen;
  ${props => props.dueDate <= props.today && css`
    color: #EA7075;
    `}
  `;

const DateCaption = styled.div`
  color: lightgrey;
`;

const ClipboardInput = styled.textarea`
  display:none;
`;

Deck.propTypes = {
  deck: PropTypes.shape().isRequired,
};
