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
      showAddDeck: false,
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }


  toggleAddDeck = () => {
    this.setState({ showAddDeck: !this.state.showAddDeck })
    console.log('toggle')
  }



  render() {
    const { decks, today } = this.props;
    const { showAddDeck } = this.state;
    return (
      <Container id="decklist container">
        <DeckListTools toggleAddDeck={this.toggleAddDeck} />
        {showAddDeck ?
          <AddDeck toggleAddDeck={this.toggleAddDeck} />
          : decks.map(deck => (
            <Deck key={deck.name} deck={deck} today={today} disableDelete />
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
align-items: flex-start;
background: ${props => props.theme.dark.bodyBackground};

@media (max-width: 500px) {
  margin-left: 0;
  margin-top: 65px;
  padding-top: 15px;
}
`;
