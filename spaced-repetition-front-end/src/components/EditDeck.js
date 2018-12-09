import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import CardInputs from './CardInputs';

// Need to make sure all card inputs are completed before submitting
// iterate through all the properties exist on each object
// check to make sure value.length of each is greater than 0

class EditDeck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            public: false,
            tags: '',
            cards: [],
        };
    }

    componentDidMount() {
        const { deck } = this.props;

        this.setState({
            name: deck.name,
            public: deck.public,
            tags: deck.tags,
            cards: deck.cards,
        });
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

    editDeck = (e) => {
        e.preventDefault();
        const { deck, toggleEditModeToFalse, history } = this.props;
        const deckfromState = this.state;
        const newDeck = {
            name: deckfromState.name,
            public: deckfromState.public,
            tags: deckfromState.tags,
        };
        const token = localStorage.getItem('id_token');
        const headers = { Authorization: `Bearer ${token}` };
        axios.put(`${process.env.REACT_APP_URL}/api/decks/${deck.id}`, newDeck, { headers })
            .then((response) => {
                console.log(response.data);
                toggleEditModeToFalse();

            })
            .catch(error => console.log(error));

        // window.location.reload();

        // history.push(`/dashboard/decks/${deck.id}`)
    }

    newCard = () => {
        this.setState(state => ({ cards: [...state.cards, { language: 'Plain Text' }] }));
    }

    render() {
        const { state } = this;
        const { deleteDeck, deck } = this.props;
        return (
            <EditDeckContainer>
                <Header>Edit Deck:</Header>
                <DeckForm onSubmit={this.editDeck}>
                    <DeckInfo>
                        <DeckItem>
                            <p>Deck Name</p>
                            <input type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
                        </DeckItem>
                        <DeckItem>
                            <p>Tags</p>
                            <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
                        </DeckItem>

                    </DeckInfo>
                    <Public>
                        <p >Enable sharing for this deck?</p>
                        <input type="checkbox" name="public" onChange={this.handleChange} />
                    </Public>
                    <Controls>
                        <Button type="submit">Save</Button>
                        <Delete onClick={() => deleteDeck(deck.id)}>Delete</Delete>
                    </Controls>
                </DeckForm>
                {/* {state.cards.map((x, i) => <CardInputs i={i} key={i} handleCardChange={this.handleCardChange} />)} */}
                {/* <Button type="button" onClick={this.newCard}>Add Card</Button> */}
            </EditDeckContainer>
        );
    }
}

export default withRouter(EditDeck);

const EditDeckContainer = styled.div`
  width: 80%;
  border: 1px solid ${props => props.theme.dark.main};
  background: ${props => props.theme.dark.cardBackground};
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
    @media (max-width: 700px) {
        /* padding: 10px; */
        width: 95%;
        margin: 10px 0px 10px 0px;
    }
`;

const Header = styled.h2`
    font-size: 22px;
    padding: 5px;
`

const DeckForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  align-items: center;
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
  align-items: baseline;
  justify-content: space-between;
  box-shadow: none;
  input[type="text"] {
    flex-grow: 1;
  }
  button {
    flex-grow: 0.5;
  }
  * {
    margin-left: 5px; 
  }
  input:first-child {
    margin-left: 0;
  }

    @media (max-width: 700px) {
      width: 100%;
      flex-direction: column;
        * {
            margin-left: 0px; 
            }
  }
`;

const DeckItem = styled.div`
  font-size: 18px;
  padding-bottom: 2px;
  width: 100%;

  input {
      width: 80%;
    @media (max-width: 700px) {
        width: 100%;
    }
  }
`

const Public = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
    padding-bottom: 10px;
  input {
    align-self: center;
    margin: 0px;
    height: 20px;
    width: 20px;
    border-radius: 9px;
    padding: 3px;
  }

  p {
    color: white;
    padding-right: 10px;
  }
`


const Controls = styled.div`
  display:flex;
  justify-content: space-between;
  width: 80%;
  @media (max-width: 700px) {
      width: 100%;
      flex-direction: column;
  }

`

const Button = styled.button`
  ${props => props.theme.dark.buttons.base}
  width: 150px;
  &:hover {
    background: ${props => props.theme.dark.logo};
    color: ${props => props.theme.dark.main};
    cursor: pointer;
  }
    @media (max-width: 700px) {
      width: 100%;
  }
`;

const Delete = styled(Button)`
  background: ${props => props.theme.dark.buttons.negative};
    &:hover {
    color: ${props => props.theme.dark.main};
    background: #F7979C;
  }
`