import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../App.css';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile, handleUpdateTier } = this.props;
    return (
      <StripeProvider apiKey="pk_test_KoWcK14l0HlLnKEAFc9icsPa">
        <BillingContainer>
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
        </BillingContainer>
      </StripeProvider>
    );
  }
}

export default Billing;

// styles
const BillingContainer = styled.div`
  width: 800px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
