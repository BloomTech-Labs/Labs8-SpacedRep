import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../App.css';

const Billing = (props) => {
  const { profile, handleUpdateTier } = props;
  return (
    <StripeProvider apiKey="pk_test_KoWcK14l0HlLnKEAFc9icsPa">
      <div>
        <h1>Billing</h1>
        <p>Free tier users are limited to 3 decks and a maximum of 150 cards.</p>
        <p>No limit for paid.</p>
        <p>Would you like to complete the purchase?</p>
        <Elements>
          <CheckoutForm
            handleUpdateTier={handleUpdateTier}
            profile={profile}
          />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default Billing;
