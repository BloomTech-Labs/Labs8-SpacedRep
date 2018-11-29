import React, { Component } from 'react';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

const idToken = localStorage.getItem('id_token');
const headers = { Authorization: `Bearer ${idToken}` };

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    axios.post(`${process.env.REACT_APP_URL}/api/stripe`, purchaseObj, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));
  };

  cancelSubscription = async (e) => {
    e.preventDefault();
    const { profile, handleUpdateTier } = this.props;

    axios.put(`${process.env.REACT_APP_URL}/api/stripe`, { sub: profile.sub }, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));
  };

  render() {
    const { profile } = this.props;
    if (profile && profile.tier === 'free') {
      return (
        <CheckoutFormContainer>
          <CardElement style={{ base: { fontSize: '18px', color: 'white' } }} />
          <button onClick={this.handleSubscribe} type="submit">
            Buy now
          </button>
        </CheckoutFormContainer>
      );
    }
    return (
      <CheckoutFormContainer>
        <CardElement style={{ base: { fontSize: '18px', color: 'white' } }} />
        <button onClick={this.cancelSubscription} type="submit">
          cancel
        </button>
      </CheckoutFormContainer>
    );
  }
}

export default injectStripe(CheckoutForm);

// Don't want to dwell on customizing the look just yet
const CheckoutFormContainer = styled.div`

`;
