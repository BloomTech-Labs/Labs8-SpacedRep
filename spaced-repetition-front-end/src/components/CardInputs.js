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
      deck_id: '',
      saved: false,
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
    const { title, question, answer, language } = state;
    props.onCardSave({ title, question, answer, language });

    //disable save button to stop resubmission of card. FIX: should change this to be editable 
    this.setState({ saved: true })
  }

  render() {
    const { state, props } = this;
    return (
      <Container>
        {this.props.cardNumber === 1 && <h2>Add New Card:</h2>}
        <AddCardForm onSubmit={this.saveCard}>
          <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
          <textarea type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <textarea type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
          {/* <input type="number" value={state.deck_id} name="deck_id" onChange={this.handleChange} placeholder="deck_id" required /> */}
          <input type="text" value={state.language} name="language" onChange={this.handleChange} placeholder="Language" required />
          {!state.saved && <button type="submit">Save</button>}
        </AddCardForm>
      </Container>
    );
  }
}

export default CardInputs;

// styles
const Container = styled.div`
  padding-top: 20px;
`

const AddCardForm = styled.form`
  padding: 40px;
  margin: 5px;
  /* width: 50%; */
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px;
  height: 325px;
`;

const PublicDiv = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: center;
`
const PublicBox = styled.input`
  width: 20px;
  margin-top: 8px;
  border-radius: 2px;
`