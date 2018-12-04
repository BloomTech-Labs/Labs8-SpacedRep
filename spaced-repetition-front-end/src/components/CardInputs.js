import React from 'react';
import styled from 'styled-components';

// save button no longer needed (it updates dynamically)
// should implement a delete button to remove a card

class CardInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      question: '',
      answer: '',
      language: 'Plain Text',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { props } = this;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => props.handleCardChange(props.i, [name], value));
  }

  render() {
    const { state } = this;
    return (
      <Container>
        <CardInfo>
          <TopRow>
            <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
            <Dropdown name="language" onChange={this.handleChange}>
              <option value="Plain Text">Plain Text</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </Dropdown>
          </TopRow>
          <TextArea type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />
          <TextArea type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />
        </CardInfo>
      </Container>
    );
  }
}

export default CardInputs;

const Container = styled.div`
  width: 100%;
`

const CardInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 3px;
  box-shadow: none;

  input[type="text"] {
    /* width: 100%; */
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

  button, select {
    margin-left: 5px;
  }
`;

const Dropdown = styled.select`
  background-color: lightgray;
  border: none;
  height: 50px;
`;

const TextArea = styled.textarea`
    height: 50px;
    padding: 15px;
    resize: vertical;
`