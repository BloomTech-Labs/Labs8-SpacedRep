import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

// cards need title, question, answer, deck_id, language
// for deckId, will have to post the deck first, then use the response
// to set the deck_id of each card before entering into the db

class CardInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answer: '',
      deck_id: 0,
      language: '',
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
    }, () => console.log(this.state));
  }

  addCard = (e) => {
    e.preventDefault();
    const card = this.state;
    const newCard = {
      title: card.title,
      question: card.question,
      answer: card.answer,
      deck_id: card.deck_id,
      language: card.language,
    };
    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${process.env.REACT_APP_URL}/api/cards/`, newCard, { headers })
      .then(response => (
        console.log(response)
      ))
      .catch((error) => {
        this.setState({
          errorMessage: error,
        });
      });
    // post request to cards with deckCards
    this.setState({
      title: '',
      question: '',
      answer: '',
      deck_id: '',
      language: '',
    });
  }

  saveCard = (e) => {
    e.preventDefault();
    const { state, props } = this;
    props.onCardSave(state);
  }

  render() {
    const { state, props } = this;
    return (
      <div>
        <h2>Add New Card:</h2>
        <form onSubmit={this.saveCard}>
          <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
          <input type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <input type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
          <input type="number" value={state.deck_id} name="deck_id" onChange={this.handleChange} placeholder="deck_id" required />
          <input type="text" value={state.language} name="language" onChange={this.handleChange} placeholder="Language" required />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default CardInputs;
