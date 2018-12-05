import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import CardListTools from './CardListTools';
// import CardInputs from './CardInputs';
import AddCard from './AddCard';


//FIX: if 1 or 2 cards, the card's height is way too much and looks terrible
class CardList extends Component {
  state = {
    addNewCard: false,
    // deckArr: [],
  };

  handleAddCard = () => {
    this.setState({ addNewCard: !this.state.addNewCard });
  }

  handleDeckData = () => {
    const { decks } = this.props;
    const deckData = decks.map(deck => {
      return { id: deck.id, name: deck.name };
    })
    console.log('deckData from cardlist', deckData);
    return deckData;
  }

  render() {
    const { decks } = this.props;
    const { addNewCard, deckArr } = this.state;
    return (
      <CardListContainer id="CardListContainer">
        <CardListTools addNewCard={this.handleAddCard} />
        {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} />}
        {/* <div> */}

        {decks.length > 0 && decks.map((deck) => {
          return deck.cards.map((card) => {
            return <Card key={card.id} card={card} deckName={deck.name} decks={decks} />;
          });
        })}
        {decks.length === 0 && !addNewCard && (
          <div>
            <h3>Hey, it doesn't look like you've made any cards yet!</h3>
            <p>Click the Add Card button in the tool bar above to get started.</p>
          </div>
        )}
        {/* </div> */}
      </CardListContainer>
    );
  }
};

export default CardList;

// styled

const CardListContainer = styled.div`
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
background: ${props => props.theme.dark.bodyBackground}
`;

CardList.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
