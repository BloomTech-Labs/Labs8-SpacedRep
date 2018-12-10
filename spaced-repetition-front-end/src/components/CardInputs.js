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
    const { state, props } = this;
    return (
      <Container>
        <CardInfo>
          <Header>
            {`Card #${props.i + 1}`}
            <Caption> Supports code snippets too, just surround code with 3 backticks ``` </Caption>
            {props.i !== 0 && <Cancel type="button" onClick={() => props.removeCard(props.i)}>x</Cancel>}
          </Header>
          {/* Title and Language should be labels instead of p */}
          <DescriptionLine> <p>Title</p> <p>Language</p> </DescriptionLine>
          <TopRow>
            <input type="text" value={state.title} name="title" onChange={this.handleChange} placeholder="Title" required />
            <Dropdown name="language" onChange={this.handleChange}>
              <DropdownOption value="Plain Text">Plain Text</DropdownOption>
              <DropdownOption value="JavaScript">JavaScript</DropdownOption>
              <DropdownOption value="HTML">HTML</DropdownOption>
              <DropdownOption value="CSS">CSS</DropdownOption>
              <DropdownOption value="Python">Python</DropdownOption>
              <DropdownOption value="C++">C++</DropdownOption>
            </Dropdown>
          </TopRow>

          <DescriptionLine>
            <Description>Question </Description>
          </DescriptionLine>
          <TextArea type="text" value={state.question} name="question" onChange={this.handleChange} placeholder="Question" required />

          <DescriptionLine>
            <Description>Answer </Description>
          </DescriptionLine>
          <TextArea type="text" value={state.answer} name="answer" onChange={this.handleChange} placeholder="Answer" required />

        </CardInfo>
      </Container>
    );
  }
}

export default CardInputs;

const Container = styled.div`
  width: 100%;
  margin: 6px 0px 6px 0px;
`

const Header = styled.h3`
  display: flex;
  justify-content:space-between;
  align-items: center;
  /* align-content:center; */
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;
`

const Cancel = styled.button`
  border: none;
  background: none;
  color: lightgrey;
  font-weight: bold;
  font-size: 24px;
  height: 26px;
  margin: 0px;
  color: ${props => props.theme.dark.buttons.negative};
  &:hover {
    background: grey;
  }
  /* width: 100px; */
`;

const DescriptionLine = styled.div`
  display:flex;
  justify-content:space-between;
  font-size: 18px;
  padding-bottom: 2px;
`
const Caption = styled.p`
  font-size: 14px;
  color: lightgrey;
`

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

const CardInfo = styled.div`
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

const Description = styled.p`
  font-size: 18px;
  padding-right: 10px;
`



const Dropdown = styled.select`
  border-radius: 3px;
  background-color: lightgray;
  border: none;
  height: 50px;
`;

const DropdownOption = styled.option`
  /* background: darkgrey; */
  background: ${props => props.theme.dark.main};
  color: white;
`

const TextArea = styled.textarea`
    height: 75px;
    padding: 15px;
    resize: vertical;
`