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
  };

  toggleAddDeck = () => {
    this.setState({ showAddDeck: !this.state.showAddDeck })
    console.log('toggle')
  }



  render() {
    const { decks, today } = this.props;
    const { showAddDeck } = this.state;
    return (
      <Container id="decklist container">
        <DeckListTools toggleAddDeck={this.toggleAddDeck} showAddDeck={showAddDeck} />
        <DeckListContainer>
          {showAddDeck ?
            <AddDeck toggleAddDeck={this.toggleAddDeck} />
            : decks.length > 0 ? decks.map(deck => (
              <Deck key={deck.name} deck={deck} today={today} disableDelete disableEdit />
            ))
              :
              <Welcome>
                <h3>Hey, it doesn't look like you have any decks yet!</h3>
                <p> Click  <span onClick={this.toggleAddDeck}> +Add Deck </span>  on the toolbar to create your first deck. </p>
              </Welcome>
          }
        </DeckListContainer>
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
overflow: auto; //comment out this, might fix scrolls
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: flex-start;
background: ${props => props.theme.dark.bodyBackground};

/* &::-webkit-scrollbar {
  display: none;
} */

  @media (max-width: 500px) {
    margin-left: 0;
    margin-top: 65px;
    padding-top: 15px;
  }
`;

const DeckListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: baseline; */
`


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
