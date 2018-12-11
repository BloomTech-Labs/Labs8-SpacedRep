import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import handleCardSnippets from '../snippets';
import Card from './Card';
import CardListTools from './CardListTools';
// import CardInputs from './CardInputs';
import AddCard from './AddCard';

//FIX: if 1 or 2 cards, the card's height is way too much and looks terrible
class CardList extends Component {
  state = {
    addNewCard: false,
    modalIsOpen: false,
    // formattedDeck: [],
  };

  // componentDidMount = () => {
  //   const { deck } = this.props;
  //   const formattedDeck = [];

  //   deck.cards.forEach((card) => {
  //     const formattedCard = handleCardSnippets(card);
  //     formattedDeck.push(formattedCard);
  //   });

  //   this.setState({ formattedDeck });
  // }

  countCards = (decksArray) => {
    let cardCount;
    for (let i = 0; i < decksArray.length; i++) {
      cardCount += decksArray[i].cards.length;
    }
    return cardCount;
  }

  handleAddCard = () => {
    const { profile, decks, history } = this.props;
    if (decks.length === 0) history.push('/dashboard/decks');
    if (profile.tier === 'free' && this.countCards(decks) >= 150) {
      this.setState({ modalIsOpen: true });
      return;
    }
    this.setState(prevState => ({
      addNewCard: !prevState.addNewCard,
    }));
  }

  handleDeckData = () => {
    const { decks } = this.props;
    const deckData = decks.map((deck) => {
      return { id: deck.id, name: deck.name };
    })
    console.log('deckData from cardlist', deckData);
    return deckData;
  }

  handleWelcomeClick = () => {
    const { history } = this.props;
    history.push('/dashboard/decks')
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { decks, profile } = this.props;
    const { addNewCard, modalIsOpen } = this.state;
    let allowedDecks;
    if (profile && profile.tier === 'free') {
      allowedDecks = decks.slice(0, 3);
    } else {
      allowedDecks = decks;
    }
    return (
      <CardListContainer id="CardListContainer">
        <ModalWrapper isOpen={modalIsOpen} onRequestClose={this.closeModal}>
          <Text>Only paid users can make more than 150 cards!</Text>
          <ButtonContainer>
            <SaveButton onClick={this.goToCheckout} type="submit">
              Go to checkout
            </SaveButton>
            <Cancel onClick={this.closeModal} type="submit">
              No thanks
            </Cancel>
          </ButtonContainer>
        </ModalWrapper>
        <CardListTools addNewCard={this.handleAddCard} />
        {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} />}
        <CardsContainer>

          {allowedDecks.length > 0 && allowedDecks.map((deck) => {
            return deck.cards.map((card) => {
              const formattedCard = handleCardSnippets(card);
              return <Card key={`${card.id} ${card.title}`} card={formattedCard} deckName={deck.name} decks={allowedDecks} />;
            });
          })}
        </CardsContainer>

        {decks.length === 0 && !addNewCard && (
          <Welcome>
            <h3>{"Hey, it looks like you haven't made any cards or decks yet!"}</h3>
            <p>Click <span onClick={this.handleWelcomeClick}> Decks </span>on the sidebar to get started.</p>
          </Welcome>
        )}
      </CardListContainer>
    );
  }
};

export default CardList;

// styled

const CardListContainer = styled.div`
overflow: auto;
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-direction: column;
background: ${props => props.theme.dark.bodyBackground};
padding-bottom: 5%;

@media (max-width: 500px) {
  margin-left: 0;
  margin-top: 65px;
}
`;

const CardsContainer = styled.div`
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

CardList.propTypes = {
  decks: PropTypes.instanceOf(Array).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
