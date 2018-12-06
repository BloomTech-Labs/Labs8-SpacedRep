import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardInputs from './CardInputs';

// need to limit it so users can only hit save on a card once,
// otherwise they're able to repeatedly duplicate the card on save

// NOTE: cardCount is there to be able to iterate with JSX

// Refactor idea: instead of using cardCount, just add object
// to the cards array and make changes by targeting the index in
// the array. For instance have the onCardSave fn work like handle change
// but take index as param (it's passed to component on creation)
// then you could set state like cards[i].title = val.title. This would also elminate
// the need for a save button when you finish writing a card!

class AddDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownOpenDecks: false,
      dropDownOpenLangs: false,
      languages: ['JavaScript', 'CSS', 'none'],
      deckNames: [],
      selectedLang: 'none',
      selectedDeck: 'none',
      deck_id: 0,
      title: '',
      question: '',
      answer: '',
      language: '',
      tags: '',
      singleDeckView: false,
    };
  }

  componentDidMount() {
    const { grabDeckInfo, deckID } = this.props;
    const deckNames = grabDeckInfo();
    this.setState({ deckNames }, () => console.log('deckNames', deckNames));

    if (deckID) this.setState({ singleDeckView: deckID, deck_id: deckID })
  }

  onClickOutside = (event) => {
    if (event.target.closest('#langDropdown') || event.target.closest('#deckDropdown')) return;
    this.setState({ dropDownOpenDecks: false, dropDownOpenLangs: false });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => console.log(this.state));
  }

  onCardSave = (event) => {
    event.preventDefault();
    const {
      title, question, answer, language, deck_id,
    } = this.state;

    const body = {
      title, question, answer, language, deck_id
    };

    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/cards/`, body, { headers })
      .then((response) => {
        console.log('===add card res', response)
        //       deckCards.forEach((x) => {
        //         x.deck_id = response.data;
      })
      .catch(err => console.log(err.message));

  };

  toggleListDecks = () => {
    this.setState(prevState => ({
      dropDownOpenDecks: !prevState.dropDownOpenDecks,
    }));
  }

  toggleListLangs = () => {
    this.setState(prevState => ({
      dropDownOpenLangs: !prevState.dropDownOpenLangs,
    }));
  }

  toggleSelectedDecks = (event) => {
    console.log('event', event.target);
    const name = event.target.getAttribute('name'); //'HOME'
    const id = event.target.getAttribute('id'); //'HOME'
    // change language selected to true
    // const selected = this.state.languages.filter(lang => lang === name);

    this.setState({
      selectedDeck: name,
      deck_id: id,
    }, console.log('deck_id', this.state.deck_id));
    // console.log('id', id, 'key', key);
    // const temp = this.state.languages[key];

    // temp[id].selected = !temp[id].selected;
    // this.setState({
    //   [key]: temp,
    // });
  }

  toggleSelectedLangs = (event) => {
    console.log('event', event.target);
    const name = event.target.getAttribute('name'); // 'HOME'
    // change language selected to true
    // const selected = this.state.languages.filter(lang => lang === name);

    this.setState({
      selectedLang: name,
    });
    // console.log('id', id, 'key', key);
    // const temp = this.state.languages[key];

    // temp[id].selected = !temp[id].selected;
    // this.setState({
    //   [key]: temp,
    // });
  }

  render() {
    const {
      title, tags, question, answer, dropDownOpenDecks, dropDownOpenLangs, languages, selectedLang, selectedDeck, deckNames, singleDeckView, deck_id
    } = this.state;
    const { toggleAddCard } = this.props;
    return (
      <div onClick={this.onClickOutside}>
        {deckNames.length > 0 && (
          <AddCardContainer onSubmit={this.addDeck}>
            <HeaderContainer>
              <Instructions>Add New Card:</Instructions>
              <Cancel type="button" onClick={toggleAddCard}>X</Cancel>
            </HeaderContainer>
            <input type="text" value={title} name="title" onChange={this.handleChange} placeholder="Title" required />
            {singleDeckView ? null :
              <DDWrapper id="deckDropdown">
                <DDTitleBox onClick={this.toggleListDecks}>
                  <div>{`Deck: ${selectedDeck}`}</div>
                  {dropDownOpenDecks
                    ? 'X'
                    : 'open'
                  }
                </DDTitleBox>
                {dropDownOpenDecks && (
                  <DDlist>
                    {deckNames.map(deck => (
                      // <li className="dd-list-item" key={deck.id}>{deck.title}</li>
                      <li
                        key={deck.name}
                        onClick={this.toggleSelectedDecks}
                        name={deck.name}
                        id={deck.id}
                      >
                        {deck.name}
                      </li>
                    ))}
                  </DDlist>
                )}
              </DDWrapper>
            }
            <DDWrapper id="langDropdown">
              <DDTitleBox onClick={this.toggleListLangs}>
                <div>{`Code Language: ${selectedLang}`}</div>
                {dropDownOpenLangs
                  ? 'X'
                  : 'open'
                }
              </DDTitleBox>
              {dropDownOpenLangs && (
                <DDlist>
                  {languages.map(lang => (
                    // <li className="dd-list-item" key={lang.id}>{lang.title}</li>
                    <li
                      key={lang}
                      onClick={this.toggleSelectedLangs}
                      name={lang}
                    >
                      {lang}
                      {/* {lang === selected && 'check'} */}
                    </li>
                  ))}
                </DDlist>
              )}
            </DDWrapper>
            <textarea value={question} onChange={this.handleChange} placeholder="Question" name="question" />
            <textarea value={answer} onChange={this.handleChange} placeholder="Answer" name="answer" />
            <input type="text" value={tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />


            <Save type="submit" onClick={this.onCardSave}>Add Card</Save>

          </AddCardContainer>
        )}
        {deckNames.length === 0 && (
          <div>
            <h3>Oops!</h3>
            <p>You need to make at least 1 deck before you can make cards.</p>
            <Link to="/dashboard/add-deck">Click here to make your first deck!</Link>
          </div>
        )}
      </div>
    );
  }
}

export default AddDeck;

const AddCardContainer = styled.div`
  /* width: 100%; */
  /* padding: 10px; */
  /* margin: 10px; */
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.sidebar};
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  /* align-content:center; */
  width: 100%;
  margin-bottom: 5px;
`
const Instructions = styled.h3`
  padding: 0px;
  margin: 0px;

`
const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;

  height: 26px;
  margin: 0px;

  &:hover {
    background: grey;
  }
  /* width: 100px; */
`

const Save = styled.button`
  /* width: 100px; */
`
const DDWrapper = styled.div`
  color: white;
`;

const DDTitleBox = styled.div`
  border: 1px solid gray;
  padding: 4%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DDlist = styled.ul`
border: 1px solid gray;
padding: 4%;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
width: 274px;
margin: -10px 0 10px 0;
margin-bottom: 10px;
list-style-type: none;
flex-direction: column;
`;

