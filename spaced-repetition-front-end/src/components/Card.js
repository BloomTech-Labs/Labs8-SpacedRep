import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import '../App.css';

const Card = props => {
  const { card } = props;
  return (
    <Container>
      <div>
        name:
        {card.cardName}
      </div>
      <div>
        question:
        {card.questionText}
      </div>
      <div>
        answer:
        {card.answerText}
      </div>
      <div>
        code:
        {card.codeSnippet}
      </div>
      <div>
        tags:
        {card.tags.join(', ')}
      </div>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  padding: 20px;
  margin: 5px;
  width: 50%;
  border: 1px solid ${props => props.theme.dark.sidebar};
  background: ${props => props.theme.dark.cardBackground};
  border-radius: 4px;
`;

// Wrapper.propTypes = {
//   card: PropTypes.object.isRequired
// };
