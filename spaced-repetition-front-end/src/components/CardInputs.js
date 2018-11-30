import React from 'react';
import styled from 'styled-components';

class CardInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answer: '',
      language: 'Plain Text',
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
      <div>
        <CardInfo onSubmit={this.saveCard}>
          <TopRow>
            <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
            {/* <input type="text" value={state.language} name="language" onChange={this.handleChange} placeholder="Language" required /> */}
            <Dropdown name="language" onChange={this.handleChange}>
              <option value="Plain Text">Plain Text</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </Dropdown>
            {!state.saved && <button type="submit">Save</button>}
          </TopRow>
          <input type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <input type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
        </CardInfo>
      </div>
    );
  }
}

export default CardInputs;

const CardInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  align-items: baseline;
  justify-content: space-between;
  box-shadow: none;

  input[type="text"] {
    width: 100%;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #5e707b;
  border-radius: 3px;
  align-items: baseline;
  justify-content: space-between;
  box-shadow: none;

  input[name="title"] {
    flex-grow:1;
  }
`;

const Dropdown = styled.select`
  background-color: lightgray;
  border: none;
  height: 50px;
`;
