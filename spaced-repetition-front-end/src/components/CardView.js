import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CardView extends React.Component {
  state = {
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
    const { grabDeckInfo } = this.props;
    // const deckNames = grabDeckInfo();
    // this.setState({ deckNames }, () => console.log('deckNames', deckNames));
  }


  editMode = () => {
    console.log('edit')
  }


  render() {


    const { card, deckName } = this.props
    // const { tags } = card;
    const tags = ['js', 'css', 'plaintext'];

    return (
      <Card>
        <p>{`Title: ${card.title}`}</p>
        <p>{`Question: ${card.question}`}</p>
        <p>{`Answer: ${card.answer}`}</p>
        <p>{`Language: ${card.language}`}</p>
        <p>Tags:</p>
        <TagsContainer>
          {tags && tags.map(tag => <p key={tag}>{tag}</p>)}
        </TagsContainer>
        <CardInteractions>
          <p>{`From deck: ${deckName}`}</p>
          <button type="button" onClick={this.editMode}>Edit</button>
        </CardInteractions>
      </Card>
    );
  }
};

export default CardView;

// styles

const Card = styled.div`
  border: 1px solid black;
  width: 315px;
  margin: 2%;
  padding 2%;
`;

const CardInteractions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagsContainer = styled.div`
  display: flex;

  p {
    /* border: 1px solid black; */
    padding: 2%;
    margin: 2%;
  }
`;

CardView.propTypes = {
  card: PropTypes.instanceOf(Object).isRequired,
};
