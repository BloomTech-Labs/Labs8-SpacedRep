import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Card extends React.Component {
  state = {
    trained: false,
    currentCardID: 0,
  };

  showAnswer = () => {
    this.setState({ trained: true });
  }

  componentDidMount() {

  }

  handleAnswer(difficulty) {
    // object to send to server: {difficulty: '', cardID: ''}
    const progressUpdate = { cardID: this.state.currentCardID, difficulty }

    //current difficulty only has 2 options, not using boolean
    // so that we can easily implement more difficulties

    this.props.updateProgress(progressUpdate)


  }

  render() {
    const { data } = this.props;
    const { trained } = this.state;
    return (
      data ? (
        <CardContainer>
          <CardData>
            <CardTitle>{data.cards[0].title}</CardTitle>
            <CardText>{data.cards[0].question}</CardText>
          </CardData>
          {trained && (
            <CardInteractions>
              <CardText>{data.cards[0].answer}</CardText>
              <CardButton type="button" onClick={() => this.handleAnswer(0)} >Missed It</CardButton>
              <CardButton type="button" onClick={() => this.handleAnswer(1)}>Got It</CardButton>
            </CardInteractions>
          )}
          {!trained && <button type="button" onClick={this.showAnswer}>Show Answer</button>}
        </CardContainer>
      ) : null
    );
  }
}

export default Card;

// styles
const CardContainer = styled.div`
`;

const CardData = styled.div`
`;

const CardTitle = styled.h2`
`;

const CardText = styled.p`
`;

const CardInteractions = styled.div`
`;

const CardButton = styled.button`
`;

Card.propTypes = {
  data: PropTypes.shape().isRequired,
};
