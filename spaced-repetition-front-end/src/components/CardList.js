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

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }


  handleAddCard = () => {
    const { decks, history } = this.props;
    if (decks.length === 0) history.push('/dashboard/decks')
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

  handleWelcomeClick = () => {
    const { history } = this.props;
    history.push('/dashboard/decks')
  }

  render() {
    const { decks } = this.props;
    const { addNewCard, deckArr } = this.state;
    return (
      <CardListContainer id="CardListContainer">
        <CardListTools addNewCard={this.handleAddCard} />
        {addNewCard && <AddCard grabDeckInfo={this.handleDeckData} toggleAddCard={this.handleAddCard} />}
        {/* <div id="cardlistcontainer"> */}

        {decks.length > 0 && decks.map((deck) => {
          return deck.cards.map((card) => {
            return <Card key={card.id} card={card} deckName={deck.name} decks={decks} />;
          });
        })}
        {/* </div> */}

        {decks.length === 0 && !addNewCard && (
          <Welcome>
            <h3>Hey, it doesn't look like you haven't made any cards or decks yet!</h3>
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
flex-wrap: wrap;
justify-content: center;
background: ${props => props.theme.dark.bodyBackground};

/* &::-webkit-scrollbar {
  display: none;
} */

@media (max-width: 500px) {
  margin-left: 0;
  margin-top: 65px;
}
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
`


CardList.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
