import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import CardListTools from './CardListTools';
// import CardInputs from './CardInputs';
import AddCard from './AddCard';
import Deck from './Deck';

class ImportDeck extends Component {
  state = {
    addNewCard: false,
    // deckArr: [],
    deck: {
      cards: [],
      dueDate: 0,
      name: 'Default Deck',
    },
  };

  componentDidMount = () => {
    const { match } = this.props;
    const selectedDeckID = match.params.id;
    console.log(selectedDeckID);


    this.retrieveDeck();
    //   const { decks, history } = this.props;

    //   let match = false;
    //   for (let i = 0; i < decks.length; i++) {
    //     if (decks[i].id === Number(selectedDeckID)) {
    //       console.log('match');
    //       match = decks[i];
    //     }
    //   }

    //   if (!match) history.push('/dashboard/decks');

    //   this.setState({ deck: match });
  }

  retrieveDeck = () => {
    const { match } = this.props;
    const selectedDeckID = match.params.id;
    if (selectedDeckID) {
      const token = localStorage.getItem('id_token');
      const headers = { Authorization: `Bearer ${token}` };

      axios.get(`${process.env.REACT_APP_URL}/api/decks/${selectedDeckID}`, { headers })
        .then((response) => {
          console.log(response.data);
          // assign a dueDate to the deck based on its card with most recent dueDate
          if (response.data && response.data.length > 0) {
            const deck = response.data[0];

            this.setState({ deck });
          }
        })
        .catch(error => (
          this.setState({
            errorMessage: error,
          })
        ));
    }
  }

  handleAddCard = () => {
    const { addNewCard } = this.state;
    this.setState({ addNewCard: !addNewCard });
  }

  handleDeckData = () => {
    const { decks } = this.props;
    const deckData = decks.map(deck => ({ id: deck.id, name: deck.name }));

    return deckData;
  }

  handleImport = () => {
    const { deck } = this.state;
    const { history } = this.props;

    const newDeck = {
      name: deck.name,
      public: deck.public,
      tags: deck.tags,
    };
    const deckCards = [...deck.cards];

    if (deck.cards.length < 1) {
      console.log('no cards, invalid deck');
      return;
    }
    // remove unnecessary keys
    const formattedCards = [];
    const requiredKeys = ['answer', 'question', 'language', 'title']; // FIX: add tags when DB supports it
    deckCards.forEach((card) => {
      const formattedCard = {};
      requiredKeys.forEach((key) => {
        formattedCard[key] = card[key];
      });
      formattedCards.push(formattedCard);
    });


    // post request to server with formatted cards
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/decks/`, newDeck, { headers })
      .then((response) => {
        formattedCards.forEach((x) => {
          x.deck_id = response.data;
        });
        console.log(formattedCards);
        axios.post(`${process.env.REACT_APP_URL}/api/cards/batch`, formattedCards, { headers })
          .then((innerResponse) => {
            console.log(innerResponse);
          })
          .catch(err => console.log(err.message));
        window.location.reload();
        history.push('/dashboard/decks');
      })
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
  }

  handleCancel = () => {
    const { history } = this.props;
    history.push('/dashboard/decks');
  }

  render() {
    const { today, decks } = this.props;
    const { deck } = this.state;
    return (
      <DeckViewContainer>
        <Header>
          {/* <CardListTools addNewCard={this.handleAddCard} /> */}
          <Instructions>
            <h2>
              Import This Deck?
            </h2>
            <Controls>
              <Import onClick={this.handleImport}> Import Deck </Import>
              <Cancel onClick={this.handleCancel}> Cancel </Cancel>
            </Controls>

          </Instructions>
          <Deck deck={deck} today={today} disableTraining disableView disableDelete disableEdit />

        </Header>

        <h1> Cards: </h1>
        <CardsContainer>

          {/* {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} deckID={selectedDeckID} />} */}

          {deck.cards.map(card => (
            <Card key={card.id} card={card} deckName={deck.name} decks={decks} disableEdit />
          ))}

        </CardsContainer>
      </DeckViewContainer>
    );
  }
}

export default withRouter(ImportDeck);

// styled

const DeckViewContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.dark.bodyBackground};
  margin-left: 100px;
  h1{
    font-size: 25px;
    padding: 15px 15px 0px 15px ;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 15px;
  align-items: center;
  flex-wrap:wrap;
`;

const Instructions = styled.div`
   display:flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   width: 50%;
   height: 154px;
   h2 {
    font-size: 28px;
    font-weight: bold;
    border-bottom: 1px solid lightseagreen;
    padding: 30px 3px 5px 3px;
   }
`;

const Controls = styled.div`
   display:flex;
   justify-content: space-around;
   width: 100%;
`;


const Import = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
        background: ${props => props.theme.dark.sidebar};
      }
`;

const Cancel = styled(Import)`
   background: ${props => props.theme.dark.buttons.negative};
   width: 128px;
`;


const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


// CardList.propTypes = {
//   decks: PropTypes.instanceOf(Object).isRequired,
// };
