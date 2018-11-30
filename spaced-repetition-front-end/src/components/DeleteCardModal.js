import React from 'react';
import PropTypes from 'prop-types';

const DeleteCardModal = ({ match, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(match.params.id, match.params.deckId);
  }
  return (
    <div>
      <p>Are you sure you want to delete this card?</p>
      <button type="button" onClick={handleDelete}>Delete</button>
      <button type="button">Cancel</button>
    </div>
  );
};

export default DeleteCardModal;

DeleteCardModal.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};
