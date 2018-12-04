import React, { Component } from 'react';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

const idToken = localStorage.getItem('id_token');
const headers = { Authorization: `Bearer ${idToken}` };

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPurchaseForm: false,
      displayCancel: false,
    };
  }

  toggleSubscribe = (e) => {
    if (e) { e.preventDefault(); }
    this.setState(prevState => ({
      displayPurchaseForm: !prevState.displayPurchaseForm,
    }));
  }

  handleSubscribe = async (e) => {
    e.preventDefault();
    const { stripe, profile, handleUpdateTier } = this.props;
    const { token } = await stripe.createToken();

    if (!token) { return; }

    const purchaseObj = {
      purchase: {
        token,
        email: profile.email,
      },
      sub: profile.sub,
    };

    await axios.post(`${process.env.REACT_APP_URL}/api/stripe`, purchaseObj, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));

    this.toggleSubscribe();
  };

  toggleCancel = (e) => {
    if (e) { e.preventDefault(); }
    this.setState(prevState => ({
      displayCancel: !prevState.displayCancel,
    }));
  }

  cancelSubscription = async (e) => {
    e.preventDefault();
    const { profile, handleUpdateTier } = this.props;

    await axios.put(`${process.env.REACT_APP_URL}/api/stripe`, { sub: profile.sub }, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));

    this.toggleCancel();
  };

  render() {
    const { profile } = this.props;
    const { displayPurchaseForm, displayCancel } = this.state;
    if (profile && profile.tier === 'free' && displayPurchaseForm) {
      return (
        <CheckoutFormContainer>
          <CardElement style={{ base: { fontSize: '18px', color: 'white' } }} />
          <button onClick={this.handleSubscribe} type="submit">
            Buy now
          </button>
          <button onClick={this.toggleSubscribe} type="submit">
            Lemme think about it
          </button>
        </CheckoutFormContainer>
      );
    }
    if (profile && profile.tier === 'paid' && !displayCancel) {
      return (
        <button onClick={this.toggleCancel} type="submit">
          Cancel subscription
        </button>
      );
    }
    if (profile && profile.tier === 'paid' && displayCancel) {
      return (
        <div>
          <button onClick={this.cancelSubscription} type="submit">
            Cancel now
          </button>
          <button onClick={this.toggleCancel} type="submit">
            {'Nah, I\'ll keep it'}
          </button>
        </div>
      );
    }
    return (
      <button onClick={this.toggleSubscribe} type="submit">
        Subscribe
      </button>
    );
  }
}

export default injectStripe(CheckoutForm);

// Don't want to dwell on customizing the look just yet
const CheckoutFormContainer = styled.div`

`;
