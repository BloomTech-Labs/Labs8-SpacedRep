import React from 'react';
// import PropTypes from 'prop-types';
import Card from './Card';
import '../App.css';

const CardList = (props) => {
  const { cards } = props;
  return (
    <div className="card-list-container">
      {cards.map(card => (
        <Card card={card} />
      ))}
    </div>
  );
};

export default CardList;

// Wrapper.propTypes = {
//   decks: PropTypes.array.isRequired
// };
