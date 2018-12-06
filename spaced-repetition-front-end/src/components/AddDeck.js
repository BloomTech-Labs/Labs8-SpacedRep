import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import CardInputs from './CardInputs';

// Need to make sure all card inputs are completed before submitting
// iterate through all the properties exist on each object
// check to make sure value.length of each is greater than 0

class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      public: false,
      tags: '',
      cards: [{ language: 'Plain Text' }],
    };
  }

  handleChange = (e) => {
    const { target } = e;
    let val;
    if (target.type === 'checkbox') {
      val = target.checked;
    } else {
      e.preventDefault();
      val = target.value;
    }
    const { name } = target;
    this.setState({
      [name]: val,
    });
  }

  handleCardChange = (i, name, val) => {
    const { state } = this;
    const cards = [...state.cards];
    cards[i][name] = val;
    this.setState({
      cards,
    }, () => console.log(state));
  }

  addDeck = (e) => {
    e.preventDefault();
    const deck = this.state;

    const deckCards = [...deck.cards];

    //validate decks
    if (deck.name.length < 1) {
      const indexesToRemove = [];
      deckCards.forEach((card, i) => {

      })
    }

    const newDeck = {
      name: deck.name,
      public: deck.public,
      tags: deck.tags,
    };

    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/decks/`, newDeck, { headers })
      .then((response) => {
        deckCards.forEach((x) => {
          x.deck_id = response.data;
        });
        console.log(deckCards);
        axios.post(`${process.env.REACT_APP_URL}/api/cards/batch`, deckCards, { headers })
          .then((innerResponse) => {
            console.log(innerResponse);
          })
          .catch(err => console.log(err.message));
        window.location.reload();
        this.props.history.push('/dashboard/decks');
      })
      .catch(error => (
        this.setState({
          errorMessage: error,
        })
      ));
    // post request to cards with deckCards
    this.setState({
      name: '',
      public: '',
      tags: '',
      cards: [{ language: 'Plain Text' }],
    });
  }

  newCard = () => {
    this.setState((state) => ({ cards: [...state.cards, { language: 'Plain Text' }] }));
  }

  removeCard = (index) => {
    const { cards } = this.state;
    // needed to do it this way otherwise React will just erase the array
    // because it thinks you are modifying state directly
    let newCards = [...cards]
    newCards.splice(index, 1)
    this.setState({ cards: newCards });
  }

  render() {
    const { state } = this;
    const { toggleAddDeck } = this.props;

    return (

      <AddDeckContainer>
        <Header>
          Create New Deck:
          <Cancel type="button" onClick={toggleAddDeck}>x</Cancel>
        </Header>
        <DeckForm onSubmit={this.addDeck}>
          <DeckInfo>
            <Name type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
            <Tags type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />


            <SaveButton type="submit"> Save Deck </SaveButton>
          </DeckInfo>
          <Public>
            <p >Enable sharing for this deck?</p>
            <input type="checkbox" name="public" onChange={this.handleChange} />
          </Public>
        </DeckForm>
        {state.cards.map((x, i) => <CardInputs i={i} key={i} handleCardChange={this.handleCardChange} removeCard={this.removeCard} />)}
        <ControlsContainer>
          <AddCard type="button" onClick={this.newCard}>Add Another Card</AddCard>
          {state.cards.length > 1 && <SaveButton onClick={this.addDeck}> Save Deck </SaveButton>}
        </ControlsContainer>
      </AddDeckContainer>

    );
  }
}

export default withRouter(AddDeck);

const AddDeckContainer = styled.div`
  /* flex-direction: column;
  align-items: center; */
  width: 100%;
  height: 100%;
  margin: 20px 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  align-items: flex-start;
  background: ${props => props.theme.dark.bodyBackground};
`;

const Header = styled.h2`
  display: flex;
  width: 100%;
  min-height: 46px;
  /* align-self: flex-start; */
  justify-content: space-between;
  font-size: 20px;
  padding: 10px 0px 10px 0px;
`

const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;
  font-size: 20px;
  height: 26px;
  margin: 0px;
  padding: 0px;
  color: ${props => props.theme.dark.buttons.negative};

  /* width: 100px; */
`;

const DeckForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  min-height: 120px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  /* align-items: baseline; */
  justify-content: space-between;
  box-shadow: none;
`;

const DeckInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  /* align-items: baseline; */
  justify-content: space-between;
  box-shadow: none;

`;

const Public = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  input {
    align-self: center;
    margin: 0px;
    height: 20px;
    width: 20px;
    border-radius: 6px;
    padding: 3px;
  }

  p {
    color: white;
    padding-right: 10px;
  }
`

const SaveButton = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  font-size: 16px;
`

const AddCard = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  font-size: 16px;
`

const Name = styled.input``

const Tags = styled.input``

const ControlsContainer = styled.div`
  display:flex;
  width: 100%;
  justify-content: space-between;
`