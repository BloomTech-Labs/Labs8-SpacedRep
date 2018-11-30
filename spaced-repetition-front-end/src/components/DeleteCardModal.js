import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DeleteCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasDeleted: false,
    };
  }

  handleDelete = () => {
    const { match, deleteCard, history } = this.props;
    deleteCard(match.params.id, match.params.deckId);
    this.setState({ wasDeleted: true });
    setTimeout(history.push('/dashboard/decks'), 1500);
  }

  handleCancel = () => {
    // FIX: this should take you back to previous screen,
    // may want to refactor this component to accept
    // a PrevLocation prop that has the path to go back to
    // (unless you can access that from this.props.history)
    const { history } = this.props;
    history.push('/dashboard/decks');
  }

  render() {
    const { wasDeleted } = this.state;
    return (
      <div>
        {!wasDeleted && <p>Are you sure you want to delete this card?</p>}
        {wasDeleted && <p>Your card was successfully deleted.</p>}
        <button type="button" onClick={this.handleDelete}>Delete</button>
        <button type="button" onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  }
}

export default withRouter(DeleteCardModal);

DeleteCardModal.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};
