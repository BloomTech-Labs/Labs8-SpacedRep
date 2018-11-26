import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import Deck from './Deck';
import '../App.css';


class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCreateNewDeck = (e) => {
    // don't allow submission of empty deck
    e.preventDefault();
    const API_URL = 'http://localhost:4242';
    const newDeckObject = {
      name: 'testdeck',
      public: false,
      tags: 'tag1,tag2,tag3',
    };
    axios.post(`${API_URL}/api/decks`, newDeckObject)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  render() {
    const { decks } = this.props;
    return (
      <Container>
        <button onClick={this.handleCreateNewDeck} type="submit">New deck</button>
        {decks.map(deck => (
          <Deck key={deck.name} deck={deck} />
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
  width: 800px;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
