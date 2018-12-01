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

class CardList extends Component {
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
     const selectedDeckID = this.props.match.params.id;
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
     const selectedDeckID = this.props.match.params.id;
     console.log(selectedDeckID);
     if (selectedDeckID) {
       const token = localStorage.getItem('id_token');
       const headers = { Authorization: `Bearer ${token}` };

       axios.get(`${process.env.REACT_APP_URL}/api/decks/${selectedDeckID}`, { headers })
         .then((response) => {
           console.log(response.data);
           // assign a dueDate to the deck based on its card with most recent dueDate
           const deck = response.data;

           //   this.setState({ decks });
         })
         .catch(error => (
           this.setState({
             errorMessage: error,
           })
         ));
     }
   }

   handleAddCard = () => {
     this.setState({ addNewCard: !this.state.addNewCard });
   }

   handleDeckData = () => {
     const { decks } = this.props;
     const deckData = decks.map(deck => ({ id: deck.id, name: deck.name }));

     return deckData;
   }

   render() {
     const { today, decks } = this.props;
     const { addNewCard, deck } = this.state;
     const selectedDeckID = this.props.match.params.deckId;
     return (
        <DeckViewContainer>
           <Header>
              {/* <CardListTools addNewCard={this.handleAddCard} /> */}
              <Instructions>
                 <h2>
                     Import This Deck?
                  </h2>
                 <Controls>
                    <Import> Import </Import>
                    <Cancel> Cancel </Cancel>
                  </Controls>

               </Instructions>
              <Deck deck={deck} today={today} disableTraining disableView />

            </Header>


           {/* <CardsContainer>

              {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} deckID={selectedDeckID} />}

              {deck.cards.map(card => (
                 <Card key={card.id} card={card} deckName={deck.name} decks={decks} />
               ))}

            </CardsContainer>  */}
         </DeckViewContainer>
     );
   }
}

export default withRouter(CardList);

// styled

const DeckViewContainer = styled.div`
width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap:wrap;
`;

const Instructions = styled.div`
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 50%;
   
   padding-bottom: 10px;
`;

const Controls = styled.div`
   display:flex;
   justify-content: space-around;
   width: 100%;
`;


const Import = styled.button`
  /* padding: 3px 20px 3px 20px;
  margin: 0px;
  color: rgba(255,255,255, .8);
  background: #42BAAC;
  border: 1px solid #707070;
  border-radius: 6px;
  font-size: 16px; */
  ${props => props.theme.buttons.base}
  &:hover {
        background: ${props => props.theme.dark.sidebar};
      }
`;

const Cancel = styled(Import)`
   background: ${props => props.theme.buttons.negative};
`;


const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


CardList.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
