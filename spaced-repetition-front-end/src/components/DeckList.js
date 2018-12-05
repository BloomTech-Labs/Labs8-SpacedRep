import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Deck from './Deck';
import AddDeck from './AddDeck';
import DeckListTools from './DeckListTools.js';
import '../App.css';

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDeckModal: false,
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }


  handleAddDeck = () => {
    this.setState({ showAddDeckModal: !this.state.showAddDeckModal })
  }


  render() {
    const { decks, today } = this.props;
    const { showAddDeckModal } = this.state;
    return (
      <Container id="decklist container">
        <DeckListTools addNewDeck={this.handleAddDeck} />
        {showAddDeckModal ?
          <AddDeck />
          : decks.map(deck => (
            <Deck key={deck.name} deck={deck} today={today} />
          ))
        }
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
background: ${props => props.theme.dark.bodyBackground};

@media (max-width: 500px) {
  margin-left: 0;
  margin-top: 65px;
  padding-top: 15px;
}
`;
