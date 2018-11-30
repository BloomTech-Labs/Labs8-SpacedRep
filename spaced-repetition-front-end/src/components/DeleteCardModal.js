import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasDeleted: false,
    };
  }

  handleDelete = () => {
    const { match, deleteCard } = this.props;
    deleteCard(match.params.id, match.params.deckId);
    this.setState({ wasDeleted: true });
  }

  render() {
    const { wasDeleted } = this.state;
    return (
      <div>
        {!wasDeleted && <p>Are you sure you want to delete this card?</p>}
        {wasDeleted && <p>Your card was successfully deleted.</p>}
        <button type="button" onClick={this.handleDelete}>Delete</button>
        <button type="button">Cancel</button>
      </div>
    );
  }
}

export default DeleteCardModal;

DeleteCardModal.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};