import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Deck from './Deck';
import DeckListTools from './DeckListTools.js';
import '../App.css';

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    //FIX: convert back to HOC
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
  // height: 100%;
  // padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
`;

// width: 100 %;
// display: flex;
// flex - wrap: wrap;
// justify - content: center;
// // left: 200px;
// // flex-grow: 1;  /*ensures that the container will take up the full height of the parent container*/
// overflow - y: auto;  /*adds scroll to this container*/