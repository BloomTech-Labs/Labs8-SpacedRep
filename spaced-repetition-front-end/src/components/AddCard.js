import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CardInputs from './CardInputs';
import LanguageDropdown from './LanguageDropDown';

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
      dropDownOpen: false,
      languages: ['JavaScript', 'CSS', 'none'],
      selected: null,
      // name: '',
      // public: false,
      // tags: '',
      // cards: [],
      // cardCount: [],
    };
  }

  onClickOutside = (event) => {
    if (event.target.closest('#dropdown')) return;
    this.setState({ dropDownOpen: false });
  }

  // handleChange = (e) => {
  //   const { target } = e;
  //   let val;
  //   if (target.type === 'checkbox') {
  //     val = target.checked;
  //   } else {
  //     e.preventDefault();
  //     val = target.value;
  //   }
  //   const { name } = target;
  //   this.setState({
  //     [name]: val,
  //   }, () => console.log(this.state));
  // }

  // onCardSave = (newCard) => {
  //   this.setState((state) => {
  //     return { cards: [...state.cards, newCard] };
  //   });
  // }

  // addDeck = (e) => {
  //   e.preventDefault();
  //   const deck = this.state;
  //   const newDeck = {
  //     name: deck.name,
  //     public: deck.public,
  //     tags: deck.tags,
  //   };
  //   const deckCards = [...deck.cards];
  //   // post request to decks with newDeck
  //   const token = localStorage.getItem('id_token');
  //   const headers = { Authorization: `Bearer ${token}` };
  //   axios.post(`${process.env.REACT_APP_URL}/api/decks/`, newDeck, { headers })
  //     .then((response) => {
  //       deckCards.forEach((x) => {
  //         x.deck_id = response.data;
  //       })
  //       console.log(deckCards);
  //       axios.post(`${process.env.REACT_APP_URL}/api/cards/batch`, deckCards, { headers })
  //         .then((innerResponse) => {
  //           console.log(innerResponse)
  //         })
  //         .catch(err => console.log(err.message));
  //     })
  //     .catch(error => (
  //       this.setState({
  //         errorMessage: error,
  //       })
  //     ));
  //   // post request to cards with deckCards
  //   this.setState({
  //     name: '',
  //     public: '',
  //     tags: '',
  //     cards: [],
  //   });
  // }

  // newCard = () => {
  //   this.setState((state) => {
  //     return { cardCount: [...state.cardCount, 'another one'] };
  //   });
  // }
  handleClickOutside = () => {
    this.setState({
      dropDownOpen: false,
    });
  }

  toggleList = () => {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen,
    }));
  }

  toggleSelected = (event) => {
    console.log('event', event.target);
    const name = event.target.getAttribute('name'); //'HOME'
    // change language selected to true
    // const selected = this.state.languages.filter(lang => lang === name);

    this.setState({
      selected: name,
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
      title, tags, question, answer, dropDownOpen, languages, selected,
    } = this.state;
    return (
      <div onClick={this.onClickOutside}>
        <form onSubmit={this.addDeck}>
          <h2>Add New Card:</h2>
          <input type="text" value={title} name="title" onChange={this.handleChange} placeholder="Title" required />
          {/* <LanguageDropdown /> */}
          <DDWrapper id="dropdown">
            <DDTitleBox className="dd-header" onClick={this.toggleList}>
              <div className="dd-header-title">Snippet Language</div>
              {dropDownOpen
                ? 'close'
                : 'open'
              }
            </DDTitleBox>
            {dropDownOpen && (
              <DDlist className="dd-list">
                {languages.map(lang => (
                  // <li className="dd-list-item" key={lang.id}>{lang.title}</li>
                  <li
                    key={lang}
                    onClick={this.toggleSelected}
                    name={lang}
                  >
                    {lang}
                    {lang === selected && 'check'}
                  </li>
                ))}
              </DDlist>
            )}
          </DDWrapper>
          {/* <p style={{ color: 'black' }}>Public?</p> */}
          {/* <input type="checkbox" name="public" onChange={this.handleChange} /> */}
          <textarea value={question} onChange={this.handleChange} placeholder="Question" name="question" />
          <textarea value={answer} onChange={this.handleChange} placeholder="Answer" name="answer" />
          <input type="text" value={tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required />
          <button type="button" onClick={this.newCard}>Add Card</button>
          <button type="submit">Cancel</button>
          <button type="submit">Save</button>
        </form>
        {/* {cardCount.map((x, i) => {
          return <CardInputs i={i} onCardSave={this.onCardSave} />;
        })} */}
      </div>
    );
  }
}

export default AddDeck;

const DDWrapper = styled.div`
  color: black;
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
