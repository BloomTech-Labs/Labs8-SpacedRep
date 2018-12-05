import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Deck from './Deck';
import DeckListTools from './DeckListTools.js';
import '../App.css';

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    //FIX: convert back to HOC
  }

  handleAddDeck = () => {

  }


  render() {
    const { decks, today } = this.props;
    return (
      <Container id="decklist container">
        {/* Don't commit this - just for UI design thinking */}
        <DeckListTools addNewCard={this.handleAddCard} />
        {/* <button onClick={this.handleCreateNewDeck} type="submit">New deck</button> */}
        {decks.map(deck => (
          <Deck key={deck.name} deck={deck} today={today} />
        ))}
      </Container>
    );
  }
}

export default DeckList;

DeckList.propTypes = {
  decks: PropTypes.instanceOf(Array).isRequired,
};

// styles

const Container = styled.div`
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
background: ${props => props.theme.dark.bodyBackground}

@media (max-width: 500px) {
  margin-left: 0;
  margin-top: 65px;
  padding-top: 15px;
}
`;
