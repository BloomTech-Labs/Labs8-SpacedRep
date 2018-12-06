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
            <Title>
              {card.title}
            </Title>
            <LineContainer><LineDescription> Question: </LineDescription> <LineItem>{card.question}</LineItem></LineContainer>
            <LineContainer><LineDescription> Answer: </LineDescription> <LineItem> {card.answer} </LineItem> </LineContainer>
            <LineContainer><LineDescription>Language: </LineDescription> <LineItem> {card.language}</LineItem></LineContainer>
            <LineDescription>Tags:</LineDescription>
            <TagsContainer>
              {tags && tags.map(tag => <p key={tag}>{tag}</p>)}
            </TagsContainer>
            <CardInteractions>
              <p>{`From deck: ${deckName}`}</p>
              {!disableEdit && <EditButton type="button" onClick={this.toggleEdit}>Edit</EditButton>}
            </CardInteractions>
          </CardContainer>
        )
    );
  }
}

export default Card;

// styles

const CardContainer = styled.div`
  /* display:flex; */
  /* flex-direction: column; */
  width: 315px;
  margin: 2%;
  padding: 2%;
  /* border: 1px solid ${props => props.theme.dark.sidebar}; */
  border: 1px solid ${props => props.theme.dark.main};
  background: ${props => props.theme.dark.cardBackground};
`;

const CardInteractions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.p`
  padding-bottom: 8px;
  font-size: 22px;
  font-weight: bold;
`

const LineContainer = styled.p`
  padding: 4px 0px 4px 0px;
`

const LineDescription = styled.span`
  font-weight: bold;
`

const LineItem = styled.span``

const TagsContainer = styled.div`
  display: flex;
  p {
    /* border: 1px solid black; */
    padding: 2%;
    margin: 2%;
  }
`;


// ////////////edit
const EditCard = styled.form`
  color: white;
  padding: 10px;
  margin: 10px;
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.sidebar};
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  /* align-content:center; */
  width: 100%;
  margin-bottom: 5px;
`;
const Instructions = styled.h3`
  padding: 0px;
  margin: 0px;

`;
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
`;
const SaveButton = styled.button`
    ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
`;

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

const TextArea = styled.textarea`
  height: 80px;
`;

const EditButton = styled.button`
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
  
`



Card.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
};
