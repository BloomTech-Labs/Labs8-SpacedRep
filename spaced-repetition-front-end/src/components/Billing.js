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
        {profile && profile.tier === 'paid' ? (
          <PaidText>
            <Text>You are a paid user!</Text>
            <Text>Enjoy your unlimited access to decks and cards.</Text>
          </PaidText>
        ) : (
          <FreeText>
            <Text>Free tier users are limited to 3 decks and a maximum of 150 cards.</Text>
            <Text>No limit for paid.</Text>
          </FreeText>
        )}
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

  @media (max-width: 500px) {
    width: 100%;
    padding: 30px 0 0 0;
  }
`;

const PaidText = styled.div``;

const FreeText = styled.div``;

const Text = styled.p`
  font-size: 25px;
  margin-bottom: 20px;
  width: 300px;
  line-height: 30px;
`;
