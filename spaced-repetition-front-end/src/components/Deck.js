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
      shareURL: '',
      sharing: 'false',
    };
  }

  componentDidMount() {
    const { deck } = this.props;
    const endOfUrl = process.env.REACT_APP_REDIRECT.lastIndexOf('/')

    this.setState({ shareURL: `${process.env.REACT_APP_REDIRECT.substr(0, endOfUrl)}/share/deck/${deck.id}` })
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

  handleEditDeck = (e, id) => {
    console.log(id)
    e.stopPropagation();
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
    const { shareURL } = this.state;
    e.stopPropagation();
    if (document.queryCommandSupported('copy')) {
      var textField = document.createElement('textarea')
      textField.innerText = shareURL
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
      alert('Shareable link copied!')
    } else {
      console.log('Copy not supported');
      const endOfUrl = process.env.REACT_APP_REDIRECT.lastIndexOf('/');
      alert(`Shareable Link: ${process.env.REACT_APP_REDIRECT.substr(0, endOfUrl)}/share/deck/${deck.id}`)
    }
  }

  render() {
    const { deck, today, disableTraining, disableDelete, disableEdit } = this.props;

    const { isEditing, shareURL, sharing } = this.state;

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
                {/* {!disableDelete && <DeleteDeck onClick={() => this.handleDeleteDeck(deck.id)}>Delete</DeleteDeck>} */}
                <TrainDeck onClick={(e) => this.handleEditDeck(e, deck.id)}>Edit</TrainDeck>
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
          <ClipboardInput isSharing={sharing} value={shareURL} ref={ClipboardInput => this.clipboardRef = ClipboardInput} />
        </Container>
        :
        <EditDeck deck={deck} toggleEditModeToFalse={this.toggleEditModeToFalse} deleteDeck={this.handleDeleteDeck} />

    );
  }
}

export default withRouter(Deck);

// styles
const Container = styled.div`
  padding: 20px;
  margin: 20px;
  width: 50%;
  height: 100%;
  border: 1px solid ${props => props.theme.dark.main};
  background: ${props => props.theme.dark.cardBackground};
  display:flex;
  flex-direction: column;
  max-width: 370px;
  max-height: 250px;
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
  justify-content: space-between;
  padding-top: 10px;
  width: 100%;
  height: 100%;
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
    padding: 0px;
    margin: 0px;
`;

const Tag = styled.div`
  padding: 6px;
  margin-right: 5px;
  background: ${props => props.theme.dark.sidebar};
  border-radius: 2px 10px 10px;
`;

const TagCaption = styled.div`
  padding: 10px 10px 10px 0px;
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
  justify-content:space-between;
  align-items: flex-end;
  height: 50px;
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

const DeleteDeck = styled(TrainDeck)`
background: ${props => props.theme.dark.buttons.negative}
`

const ClipboardInput = styled.textarea`
  display:none;
  ${props => props.isSharing === true && css`
    display: inline-block;
  `}
  
`;

Deck.propTypes = {
  deck: PropTypes.shape().isRequired,
};
