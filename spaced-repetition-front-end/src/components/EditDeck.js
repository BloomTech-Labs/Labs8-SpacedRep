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
        const { deck, toggleEditModeToFalse } = this.props;
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
                        <input type="text" value={state.name} name="name" onChange={this.handleChange} placeholder="Name" required />
                        <input type="text" value={state.tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
                        <p style={{ color: 'black' }}>Public?</p>
                        <Checkbox type="checkbox" name="public" onChange={this.handleChange} />

                    </DeckInfo>
                    <Controls>
                        <Button type="submit">Save</Button>
                        <Delete onClick={() => deleteDeck(deck.id)}>Delete</Delete>
                    </Controls>
                </DeckForm>
                {/* {state.cards.map((x, i) => <CardInputs i={i} key={i} handleCardChange={this.handleCardChange} />)} */}
                <Button type="button" onClick={this.newCard}>Add Card</Button>
            </EditDeckContainer>
        );
    }
}

export default withRouter(EditDeck);

const EditDeckContainer = styled.div`
  width: 100%;
  padding:10px;
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
`;

const Checkbox = styled.input`
  align-self: center;
`;

const Controls = styled.div`
  display:flex;
  justify-content: space-between;
  width: 50%;
`

const Button = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
`;

const Delete = styled(Button)`
  background: ${props => props.theme.dark.buttons.negative};
`