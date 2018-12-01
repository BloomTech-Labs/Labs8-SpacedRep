import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Card from './Card';
import CardListTools from './CardListTools';
// import CardInputs from './CardInputs';
import AddCard from './AddCard';
import Deck from './Deck';

class CardList extends Component {
  state = {
    addNewCard: false,
    // deckArr: [],
    deck: {
      cards: [],
      dueDate: 0,
      name: 'Default Deck'
    }
  };

  componentDidMount = () => {
    const selectedDeckID = this.props.match.params.deckId
    const { decks, history } = this.props;

    let match = false;
    for (let i = 0; i < decks.length; i++) {
      if (decks[i].id == selectedDeckID) {
        console.log('match')
        match = decks[i];
      }
    }

    if (!match) history.push('/dashboard/decks')

    this.setState({ deck: match })
  }


  handleAddCard = () => {
    this.setState({ addNewCard: !this.state.addNewCard });
  }

  handleDeckData = () => {
    const { decks } = this.props;
    const deckData = decks.map(deck => {
      return { id: deck.id, name: deck.name };
    })

    return deckData;
  }

  render() {
    const { today, decks } = this.props;
    const { addNewCard, deck } = this.state;
    const selectedDeckID = this.props.match.params.deckId
    return (
      <DeckViewContainer>
        <Header>
          <CardListTools addNewCard={this.handleAddCard} />
          <Deck deck={deck} today={today} />
        </Header>


        <CardsContainer>

          {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} deckID={selectedDeckID} />}

          {deck.cards.map((card) => (
            <Card key={card.id} card={card} deckName={deck.name} decks={decks} />
          ))}

        </CardsContainer>
      </DeckViewContainer>
    );
  }
};

export default withRouter(CardList);

// styled

const DeckViewContainer = styled.div`
width: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  /* justify-content: center; */
  align-items: center;
`



const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


CardList.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
