import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import '../App.css';

const Card = (props) => {
  const { card } = props;
  console.log('card: ', card);
  return (
    <Container>
      <div>
        name:
        {card.title}
      </div>
      <div>
        question:
        {card.question}
      </div>
      <div>
        answer:
        {card.answer}
      </div>
      <div>
        language:
        {card.language}
      </div>
      <div>
        tags:
        {card.tags}
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
