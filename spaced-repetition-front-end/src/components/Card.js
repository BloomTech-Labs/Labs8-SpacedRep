import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

class Card extends React.Component {
  state = {
    isEditing: false,
    dropDownOpenDecks: false,
    dropDownOpenLangs: false,
    languages: ['JavaScript', 'CSS', 'none'],
    deckNames: [],
    selectedLang: 'none',
    selectedDeck: 'none',
    deckId: 0,
    title: '',
    question: '',
    answer: '',
    language: '',
    tags: '',
  };


  componentDidMount = () => {
    const { card, decks } = this.props;

    // console.log(card)
    this.setState({
      title: card.title, question: card.question, answer: card.answer, language: card.language, selectedDeck: card.deck_id,
    });
    // const deckNames = grabDeckInfo();
    // this.setState({ deckNames }, () => console.log('deckNames', deckNames));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

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
    const name = event.target.getAttribute('name'); // 'HOME'
    const id = event.target.getAttribute('id'); // 'HOME'

    this.setState({
      selectedDeck: name,
      deck_id: id,
    }, console.log('deck_id', this.state.deck_id));
  }

  toggleSelectedLangs = (event) => {
    console.log('event', event.target);
    const name = event.target.getAttribute('name'); // 'HOME'

    this.setState({
      selectedLang: name,
    });
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  }

  toggleAddCard = () => {

  }

  onCardSave = (event) => {
    event.preventDefault();
    const { id } = this.props.card;
    const {
      title, question, answer, language, deck_id,
    } = this.state;

    const body = {
      title, question, answer, language, deck_id,
    };

    const token = localStorage.getItem('id_token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.put(`${process.env.REACT_APP_URL}/api/cards/${id}`, body, { headers })
      .then((response) => {
        console.log('===add card res', response);
        //       deckCards.forEach((x) => {
        //         x.deck_id = response.data;
        window.location.reload();
      })
      .catch(err => console.log(err.message));
  };

  editCard = () => {
    const {
      title, tags, question, answer, dropDownOpenDecks, dropDownOpenLangs, languages, selectedLang, selectedDeck, deckNames,
    } = this.state;
    const { toggleEdit } = this;
    return (
      <EditCard onSubmit={this.addDeck}>
        <HeaderContainer>
          <Instructions>Edit Card:</Instructions>
          <Cancel type="button" onClick={toggleEdit}>X</Cancel>
        </HeaderContainer>
        <input type="text" value={title} name="title" onChange={this.handleChange} placeholder="Title" required />
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
        <TextArea value={question} onChange={this.handleChange} placeholder="Question" name="question" />
        <TextArea value={answer} onChange={this.handleChange} placeholder="Answer" name="answer" />
        {/* <input type="text" value={tags} name="tags" onChange={this.handleChange} placeholder="Enter a list of tags separated by comma (no spaces)" required /> */}
        <SaveButton type="submit" onClick={this.onCardSave}>Save</SaveButton>
      </EditCard>
    );
  }

  render() {
    const { card, deckName, disableEdit } = this.props;
    // const { tags } = card;
    const tags = ['js', 'css', 'plaintext'];
    const { isEditing } = this.state;

    return (

      isEditing
        ? this.editCard()
        : (
          <CardContainer>
            <CardTop>

              <Title>
                {card.title}
              </Title>


              <Body>
                <BodyGroup>
                  <Label>Question:</Label>
                  <Text>{card.question}</Text>
                </BodyGroup>
                <BodyGroup bottom>
                  <Label> Answer: </Label>
                  <Text>{card.answer}</Text>
                </BodyGroup>
              </Body>



              <TagsLang id="tagslang">
                <p>
                  <span>Language:{' '}</span>
                  {card.language}
                </p>
                <TagsContainer>
                  {/* <span>Tags:</span> */}
                  <div>
                    {tags && tags.map(tag => <p key={tag}>{tag}</p>)}
                  </div>
                </TagsContainer>
              </TagsLang>
            </CardTop>
            <CardBottom>
              <FromDeck>
                Belongs to
                {/* The {' '} corrects the spacing issue */}
                {' '}
                <DeckName>{deckName}</DeckName>
                {' '}
                Deck
              </FromDeck>
              {!disableEdit && (
                <EditButton type="button" onClick={this.toggleEdit}>
                  <i className="fas fa-pencil-alt" />
                  edit card
                </EditButton>
              )}
            </CardBottom>
          </CardContainer>
        )
    );
  }
}

export default Card;

// styles

const CardContainer = styled.div`
box-shadow: 2px 2px 10px 0px black;
border-radius: 20px;
width: 100%;
max-width: 415px;
height: 100%;
max-height: 370px;
margin: 2%;
border: 1px solid ${props => props.theme.dark.main};
background: ${props => props.theme.dark.cardBackground};
`;

const CardTop = styled.div`
width: 100%;
height: 88%;
padding: 4%;

// div {
// padding: 3% 0;
// height: 65%;
// }
`;

const Title = styled.h2`
height: 10%;
// border: 1px solid pink; // temp
font-size: 22px;
font-weight: bold;
`;

const Body = styled.div`
height: 70%;
display: flex;
flex-direction: column;
justify-content: space-around;
line-height: 1.2;
// border: 1px solid pink; // temp
`;

const BodyGroup = styled.div`
margin-bottom: ${props => props.bottom ? '15px' : null};
`;

const Label = styled.h3`
// padding: 4px 0px 4px 0px;
font-weight: bold;
letter-spacing: 0.5px;
`;

const Text = styled.p`
// font-weight: bold;
// display: block;
// width: 25%;
// padding-bottom: 4px;
// border-bottom: 2px solid mediumseagreen;
`;

const TagsLang = styled.div`
height: 20%;
border: 1px solid pink;

// font-size: 14px;
// color: lightgray;

// p {
//   span {
//     font-weight: bold;
//     margin-bottom: 8px;
//     padding-bottom: 4px;
//   }
// }
`;

const CardBottom = styled.div`
width: 100%;
height: 12%;
padding: 2% 4%;
display: flex;
justify-content: space-between;
align-items: baseline;
font-size: 14px;
background-color: #2f3d47;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
`;

const FromDeck = styled.p`
color: slategray;
`;

const DeckName = styled.span`
color: lightseagreen;
text-decoration: underline;
cursor: pointer;

&:hover {
  color: mediumseagreen;
}
`;

const EditButton = styled.button`
height: 25px;
margin-top: 0;
padding: 0;
text-align: right;
color: lightseagreen;
cursor: pointer;
background-color: transparent;
border: none;

&:hover {
  color: mediumseagreen;
}

i {
  margin-right: 5px;
}
`;

// const Bottom = styled.div`
// // display: flex;
// // justify-content: space-between;
// // align-items: center;
// // width: 100%;
// `;


const TagsContainer = styled.div`
// display: flex;

// div {
//   display: flex;
//   flex-wrap: wrap;

//   &::before {
//     content: 'Tags: ';
//   }
// }

// p {
//   padding: 7px 10px 8px 10px;
//   margin-right: 5px;
//   background: ${props => props.theme.dark.main};
//   border-radius: 2px 10px 10px;
// }
`;

const EditCard = styled.form`
// color: white;
// padding: 10px;
// margin: 10px;
// border: 1px solid ${props => props.theme.dark.sidebar};
// background: ${props => props.theme.dark.sidebar};
`;

const HeaderContainer = styled.div`
// display: flex;
// justify-content:space-between;
// align-items: center;
// width: 100%;
// margin-bottom: 5px;
`;

const Instructions = styled.h3`
// padding: 0px;
// margin: 0px;
`;

const Cancel = styled.button`
// border: none;
// background: none;
// color: lightgrey;
// font-weight: bold;
// height: 26px;
// margin: 0px;

// &:hover {
//   background: grey;
// }
`;

const SaveButton = styled.button`
// ${props => props.theme.dark.buttons.base}
// &:hover {
//   background: ${props => props.theme.dark.logo};
//   cursor: pointer;
// }
`;

const DDWrapper = styled.div`
// color: white;
`;

const DDTitleBox = styled.div`
// border: 1px solid gray;
// padding: 4%;
// display: flex;
// justify-content: space-between;
// margin-bottom: 10px;
`;

const DDlist = styled.ul`
// border: 1px solid gray;
// padding: 4%;
// display: -webkit-box;
// display: -webkit-flex;
// display: -ms-flexbox;
// width: 274px;
// margin: -10px 0 10px 0;
// margin-bottom: 10px;
// list-style-type: none;
// flex-direction: column;
`;

const TextArea = styled.textarea`
// height: 80px;
`;

Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
};
