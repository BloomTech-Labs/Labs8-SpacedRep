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
          <FreeContainer>
            <Header>
              <Tier>Free</Tier>
              <Price>
                <span>0</span>
                /mo.
              </Price>
            </Header>
            <Card>
              <Item>
                <i className="fas fa-check fs-2x" />
                Code Snippets
              </Item>
              <Item>
                <i className="fas fa-check fs-2x" />
                Built-in SRS
              </Item>
              <Item>
                <i className="fas fa-check fs-2x" />
                Team Support
              </Item>
              <Item>
                <i className="fas fa-check fs-2x" />
                Deck Sharing
              </Item>
              <Item>
                <i className="fas fa-check fs-2x" />
                Training Mode
              </Item>
              <Item>
                <i className="fas fa-check fs-2x" />
                3 Decks/150 Cards
              </Item>
            </Card>
          </FreeContainer>
        ) : (
            <UnContainer>
              <Header>
                <Tier>Unlimited</Tier>
                <Price>
                  <span>9</span>
                  .99/mo.
              </Price>
              </Header>
              <Card>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  Code Snippets
              </Item>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  Built-in SRS
              </Item>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  Team Support
              </Item>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  Deck Sharing
              </Item>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  Training Mode
              </Item>
                <Item>
                  <i className="fas fa-check fs-2x" />
                  {' '}
                  Unlimited Usage
              </Item>
              </Card>
            </UnContainer>
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

const FreeContainer = styled.div`
  border: 1px solid gray;
  background-color: #3c4f5d;
  width: 45%;
  height: 90%;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    width: 100%;
    height: 40%;
    box-shadow: none;
  }
`;

const UnContainer = styled(FreeContainer)`
  margin-bottom: 20px;
  width: 40%;
  height: 80%;
  box-shadow: none;
`;

const Header = styled.div`
  width: 100%;
  height: 30%;

  span {
    font-size: 50px;

    &::before {
      content: '$';
      position: absolute;
      font-size: 15px;
      margin-left: -10px;
      margin-top: 10px;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    height: 40%;
    background: lightseagreen;
    padding: 0 4%;
  }
`;

const Card = styled.ul`
  height: 70%;

  @media (max-width: 600px) {
    display: flex;
    height: 60%;
    display: flex;
    height: 60%;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 14px;
  }
`;

const Item = styled.li`
  height: 16.666%;
  text-align: left;
  padding-top: 5%;

  i {
    padding: 0 5%;
  }

  @media (max-width: 900px) {
    padding-top: 2%;
  }

  @media (max-width: 600px) {
    // margin: 0px 2%;
    width: 48%;
  }
`;

const Tier = styled.p`
  padding-top: 4%;
  height: 40%;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  background: lightseagreen;

  @media (max-width: 900px) {
    padding-top: 1%;
    font-size: 30px;
  }

  @media (max-width: 600px) {
    padding-top: 4%;
  }
`;

const Price = styled.p`
  height: 20%;
  padding-top: 8%;
  text-shadow: 1px 1px 2px black;
  font-weight: bold;
  text-align: center;
  span {
    font-size: 50px;

    &::before {
      content: '$';
      position: absolute;
      font-size: 15px;
      margin-left: -10px;
      margin-top: 10px;
    }
  }

  @media (max-width: 900px) {
    padding-top: 1%;
  }
`;
