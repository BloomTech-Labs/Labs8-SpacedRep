import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Deck from './Deck';
import AddDeck from './AddDeck';
import DeckListTools from './DeckListTools.js';
import '../App.css';

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDeck: false,
      modalIsOpen: false,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  toggleAddDeck = () => {
    const { profile, decks } = this.props;
    if (profile.tier === 'free' && decks.length >= 3) {
      this.setState({ modalIsOpen: true });
      return;
    }
    this.setState(prevState => ({
      showAddDeck: !prevState.showAddDeck,
    }));
    console.log('toggle');
  }

  goToCheckout = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/dashboard/profile');
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { decks, today, profile } = this.props;
    const { showAddDeck, modalIsOpen } = this.state;
    let allowedDecks;
    if (profile && profile.tier === 'free' && decks.length > 3) {
      allowedDecks = decks.slice(0, 3);
    } else {
      allowedDecks = decks;
    }
    return (
      <Container id="decklist container">
        <ModalWrapper isOpen={modalIsOpen} onRequestClose={this.closeModal}>
          <Text>Only paid users can make more than 3 decks!</Text>
          <ButtonContainer>
            <SaveButton onClick={this.goToCheckout} type="submit">
              Go to checkout
            </SaveButton>
            <Cancel onClick={this.closeModal} type="submit">
              No thanks
            </Cancel>
          </ButtonContainer>
        </ModalWrapper>
        <DeckListTools toggleAddDeck={this.toggleAddDeck} showAddDeck={showAddDeck} />
        <DeckListContainer>
          {/* <DeckContainer> */}
          {showAddDeck ?
            <AddDeck toggleAddDeck={this.toggleAddDeck} />
            : allowedDecks.length > 0 ? allowedDecks.map(deck => (
              <Deck key={deck.name} deck={deck} today={today} disableDelete disableEdit />
            ))
              :
              <Welcome>
                <h3>Hey, it doesn't look like you have any decks yet!</h3>
                <p> Click  <span onClick={this.toggleAddDeck}> +Add Deck </span>  on the toolbar to create your first deck. </p>
              </Welcome>
          }
          {/* </DeckContainer> */}
        </DeckListContainer>
      </Container>
    );
  }
}

export default DeckList;

DeckList.propTypes = {
  decks: PropTypes.instanceOf(Array).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

// styles

const Container = styled.div`
overflow: auto;
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-direction: column;
align-items: flex-start;
background: ${props => props.theme.dark.bodyBackground};
padding-bottom: 5%;
  @media (max-width: 500px) {
    margin-left: 0;
    margin-top: 65px;
  }
`;

const DeckListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Welcome = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;

  h3 {
    font-size: 22px;
    padding: 10px;
  }
  
  p {
    font-size: 18px;
    padding: 10px;
  }

  span {
    padding-bottom: 10px;
    &:hover {
    border-bottom: 1px solid lightseagreen;
    cursor:pointer;
  }
  }
`;

const ModalWrapper = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: translate(130%, 100%);
  padding: 25px;
  width: 350px;
  height: 200px;
  border: 1px solid black;
  color: white;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    transform: translate(7%, 60%);
  }
`;

const Text = styled.p`
  width: 300px;
  font-size: 25px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  font-size: 16px;
`;

const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;
  font-size: 20px;
  height: 26px;
  margin: 0px;
  padding: 10px 0 0 0;
  color: white;
  &:hover {
    text-decoration: underline;
  }
  /* width: 100px; */
`;
