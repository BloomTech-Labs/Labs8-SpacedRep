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

    this.setState({ shareURL: `${process.env.REACT_APP_REDIRECT.substr(0, endOfUrl)}/dashboard/share/deck/${deck.id}` })
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
    const { deck, today, disableTraining, disableDelete, disableEdit, toggleAddDeck } = this.props;

    const { isEditing, shareURL, sharing } = this.state;
    const { state } = this;
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
            <DeckBottom>
              <TrainingContainer>
                {/* Routes user to deck training component which handles all
                    of the training logic and flow. */}
                {!disableTraining && <TrainDeck onClick={this.handleTrain}>Train Deck</TrainDeck>}
                {!disableDelete && <DeleteDeck onClick={() => this.handleDeleteDeck(deck.id)}>Delete</DeleteDeck>}
                {!disableEdit && <TrainDeck onClick={(e) => this.handleEditDeck(e, deck.id)}>Edit</TrainDeck>}
                {!disableTraining && <DueDateContainer>
                  <DueDate today={today} dueDate={deck.dueDate}>
                    {new Date(deck.dueDate * DAY_IN_MILLISECONDS).toLocaleDateString()}
                  </DueDate>
                  <DateCaption>
                    next training
                </DateCaption>
                </DueDateContainer>
                }
              </TrainingContainer>
            </DeckBottom>
          </DeckBody>
          <ClipboardInput isSharing={sharing} value={shareURL} ref={ClipboardInput => this.clipboardRef = ClipboardInput} />
        </Container>
        :
        // <EditDeck deck={deck} toggleEditModeToFalse={this.toggleEditModeToFalse} deleteDeck={this.handleDeleteDeck} />
        <div>
          <Header>
            Create New Deck:
          <Cancel type="button" onClick={toggleAddDeck}>x</Cancel>
          </Header>
          <DeckForm onSubmit={this.addDeck}>
            <DeckInfo>
              <DeckItem>
                <p>Deck Name</p>
                <input type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
              </DeckItem>
              <DeckItem>
                <p>Tags</p>
                <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
              </DeckItem>

              <SaveButton onClick={this.addDeck}> Save Deck </SaveButton>
            </DeckInfo>
            <Public>
              <p >Enable sharing for this deck?</p>
              <input type="checkbox" name="public" onChange={this.handleChange} />
            </Public>
          </DeckForm>
        </div>
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
  border-radius: 20px;

  &:hover {
    /* background: ${props => props.theme.dark.cardBackground}; */
    background: #727E86;
    cursor: pointer;
  }
`;

const DeckHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const Title = styled.div`
  font-size: 25px;
  /* letter-spacing: 1px; */
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
  padding: 7px 10px 8px 10px;
  margin-right: 5px;
  background: ${props => props.theme.dark.main};
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
    color: ${props => props.theme.dark.main};
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
background: ${props => props.theme.dark.buttons.negative};
`

const ClipboardInput = styled.textarea`
  display:none;
  ${props => props.isSharing === true && css`
    display: inline-block;
  `}
`;

//edit card refactor
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

const DeckForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  min-height: 120px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  /* align-items: baseline; */
  justify-content: space-between;
  box-shadow: none;

  @media (max-width: 700px) {
    min-height: 270px;
  }
`;

const DeckInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  /* align-items: baseline; */
  justify-content: space-between;
  box-shadow: none;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DeckItem = styled.div`
  font-size: 18px;
  padding-bottom: 2px;
  width: 100%;

  input {
    @media (max-width: 700px) {
      width: 100%;
    }
    
  }
`

const Public = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  input {
    align-self: center;
    margin: 0px;
    height: 20px;
    width: 20px;
    border-radius: 6px;
    padding: 3px;
  }

  p {
    color: white;
    padding-right: 10px;
  }
`

const SaveButton = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  font-size: 16px;
`



///////////////style bottom of Deck
const DeckBottom = styled.div`
  /* height: 12%; */

  /* width: 100%;
  padding: 2% 4%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 14px;
  background-color: #2f3d47;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px; */
`;







Deck.propTypes = {
  deck: PropTypes.shape().isRequired,
};
