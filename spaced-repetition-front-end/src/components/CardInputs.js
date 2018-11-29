import React from 'react';
import styled from 'styled-components';

class CardInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answer: '',
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

  saveCard = (e) => {
    e.preventDefault();
    const { state, props } = this;
    props.onCardSave(state);
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h2>Add New Card:</h2>
        <form onSubmit={this.saveCard}>
          <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
          <input type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <input type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
          <input type="text" value={state.language} name="language" onChange={this.handleChange} placeholder="Language" required />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default CardInputs;
