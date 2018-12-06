import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../App.css';

const Billing = (props) => {
  const { profile, handleUpdateTier } = props;
  return (
    <StripeProvider apiKey="pk_test_KoWcK14l0HlLnKEAFc9icsPa">
      <Container>
        <Text>Free tier users are limited to 3 decks and a maximum of 150 cards.</Text>
        <Text>No limit for paid.</Text>
        <Elements>
          <CheckoutForm handleUpdateTier={handleUpdateTier} profile={profile} />
        </Elements>
      </Container>
    </StripeProvider>
  );
};

export default Billing;

// styles

const Container = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding-left: 20px;
`;

const Text = styled.p`
  font-size: 25px;
  margin-bottom: 20px;
  width: 300px;
  line-height: 30px;
`;
