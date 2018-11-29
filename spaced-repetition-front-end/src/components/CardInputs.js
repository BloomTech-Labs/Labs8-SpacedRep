import React from 'react';

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
    });
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
          <textarea type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <textarea type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
          <input type="number" value={state.deck_id} name="deck_id" onChange={this.handleChange} placeholder="deck_id" required />
          <input type="text" value={state.language} name="language" onChange={this.handleChange} placeholder="Language" required />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default CardInputs;
