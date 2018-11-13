import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';
import styled from 'styled-components';

const Card = (props) => {
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
  padding: 40px;
  border: 1px solid ${props => props.theme.dark.sidebar};
`;

// Wrapper.propTypes = {
//   card: PropTypes.object.isRequired
// };
