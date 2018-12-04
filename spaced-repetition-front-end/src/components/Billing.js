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
        <Title>Billing</Title>
        <Text>Free tier users are limited to 3 decks and a maximum of 150 cards.</Text>
        <Text>No limit for paid.</Text>
        <Elements>
          <CheckoutForm
            handleUpdateTier={handleUpdateTier}
            profile={profile}
          />
        </Elements>
      </Container>
    </StripeProvider>
  );
};

// styles

const Container = styled.div`
`;

const Title = styled.h2`
`;
const Text = styled.p`
`;
export default Billing;
