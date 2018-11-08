import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

const Card = (props) => {
  const { card } = props;
  return (
    <div className="card-container">
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
    </div>
  );
};

export default Card;

// Wrapper.propTypes = {
//   card: PropTypes.object.isRequired
// };
